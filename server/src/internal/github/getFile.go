package github

import (
	log "github.com/sirupsen/logrus"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"github.com/google/go-github/github"
	"regexp"
)

// GetFile(language string) find random file from certain repository with specified language
func GetFile(language string) (string, error) {
	repo, err := GetRandomRepository(language)

	if err != nil {
		log.Error(err)
		return "", err
	}

	contents := repo.GetContentsURL();
	contentsURL := contents[:len(contents) - 8] // Remove /{+path} from the end of API url
	resp, err := http.Get(contentsURL)

	if err != nil {
		log.Error(err)
		return "", err
	}

	body, err := ioutil.ReadAll(resp.Body)

	if resp.Body  != nil {
		defer resp.Body.Close()
	}

	if err != nil {
		log.Error(err)
		return "", err
	}
	

	var data []github.RepositoryContent 
	err = json.Unmarshal(body, &data)

	if err != nil {
		log.Error(err)
		return "", err
	}
	
	// Check for extension

	for i := range data {
		match := checkFileForExtension(language, data[i])

		if match {
			raw, getRawErr := getRawFile(data[i].GetDownloadURL())
			
			if getRawErr != nil {
				return "", getRawErr
			}

			return raw, nil
		}
	}

	return "", nil
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

func getRawFile (url string) (string, error) {
	resp, err := http.Get(url)

	if err != nil {
		log.WithFields(log.Fields{
			"url": url,
			"error": err.Error(),
		}).Error("Error during http request in getRawFile")
		return "", err
	}

	if resp.Body != nil {
		defer resp.Body.Close()
	}

	body, readErr := ioutil.ReadAll(resp.Body)

	if readErr != nil {
		log.WithFields(log.Fields{
			"body": resp.Body,
			"error": readErr.Error(),
		}).Error("Error during reading response body in getRawFile")
		return "", err
	}

	return string(body), nil
}