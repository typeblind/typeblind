package github

import (
	log "github.com/sirupsen/logrus"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"github.com/google/go-github/github"
	"regexp"
	"fmt"
)

// GetFile(language string) find random file from certain repository with specified language
func GetFile(language string) string {
	repo, err := GetRandomRepository(language)

	if err != nil {
		log.Error(err)
		return "Error"
	}

	contents := repo.GetContentsURL();
	contentsURL := contents[:len(contents) - 8] // Remove /{+path} from the end of API url
	resp, err := http.Get(contentsURL)

	if err != nil {
		log.Error(err)
		return "Error"
	}

	body, err := ioutil.ReadAll(resp.Body)

	if resp.Body  != nil {
		defer resp.Body.Close()
	}

	if err != nil {
		log.Error(err)
		return "Errror"
	}
	

	var data []github.RepositoryContent 
	err = json.Unmarshal(body, &data)

	if err != nil {
		log.Error(err)
		return "Error"
	}
	
	// Check for extension

	for i := range data {
		fmt.Println("CHECK EXTENSION FOR \n")
		fmt.Println(data[i].GetName())
		match := checkFileForExtension(language, data[i])

		if match {
			raw := getRawFile(data[i].GetDownloadURL())
			fmt.Println(raw)
			return "Success"
		}
	}

	return "Hello"
}

func checkFileForExtension (language string, file github.RepositoryContent) bool {
	filename := file.GetName()
	var re = regexp.MustCompile(`(?m)(?:\.([^.]+))?$`) // RegExp which finds file extension
	extension := string(re.Find([]byte(filename)))
	// If length of extension if less then 0 it means no matches
	if len(extension) > 0 {
    return language == extension[1:]
  } 
	
	return false
}

func getRawFile (url string) string {
	resp, err := http.Get(url)

	if err != nil {
		log.Error(err)
	}

	if resp.Body != nil{
		defer resp.Body.Close()
	}

	body, readErr := ioutil.ReadAll(resp.Body)

	if readErr != nil {
		log.Error(err)
	}

	return string(body)
}