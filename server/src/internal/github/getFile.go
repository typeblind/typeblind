package github

import (
	"context"
	"fmt"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
	"os"
)

var (
	token = os.Getenv("GITHUB_TOKEN")
)

type TokenSource struct {
	AccessToken string
}

func (t *TokenSource) Token() (*oauth2.Token, error) {
	token := &oauth2.Token{
			AccessToken: t.AccessToken,
	}
	return token, nil
}


func GetFile(extension string) string {
	ctx := context.Background()
	client := github.NewClient(nil)
	repos, _, err := client.Repositories.List(ctx, "", nil)

	if err != nil {
		fmt.Println("ERROR")
		fmt.Println(err)
	} else {
		fmt.Println(repos)
	}

	files, _, err := client.Search.Code(ctx, "addClass+in:file+language:js+repo:jquery/jquery", &github.SearchOptions{TextMatch: true})
	if (err !=nil) {
		fmt.Println("ERROR")
		fmt.Println(err)
	} else {
		fmt.Println(files.CodeResults)
	}

	result, _, err := client.Organizations.ListAll(ctx, nil)

	if (err != nil) {
		fmt.Println("ERROR")
		fmt.Println(err)
	} else {
		fmt.Println(result)
	}

	fmt.Println("ORgs")
	fmt.Println(result[0])
	fmt.Println(len(result))
 	return "Hello"
}