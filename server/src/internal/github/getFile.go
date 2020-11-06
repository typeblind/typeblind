package github

import (
	"context"
	"fmt"
	// "net/http"
	"github.com/google/go-github/github"
	// "golang.org/x/oauth2"
)

func GetFile(extension string) string {
 	// search := github.SearchService()
	 // users := search.Users(context.Background(), "")
	client := github.NewClient(nil)
	options := &github.SearchOptions{Sort: "created", Order: "desc", TextMatch: true}
	result, response, error := client.Search.Code(context.Background(), extension, options)
	// result := client.Search.
	if (error != nil) {
		fmt.Println(result.CodeResults)
		fmt.Println(result.GetIncompleteResults())
		fmt.Println(result.IncompleteResults)
		fmt.Println(response)
	}

 	return "Hello"
}