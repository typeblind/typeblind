package apiserver

import (
	"net/http"
	// "github.com/google/go-github/github"
	// "context"
)

func (s *APIServer) HandleOrgUrl() http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(("Hello on Hello page")))
	}
}

func getOrgByName(name string) string{
	// ghClient := github.NewClient(nil)
	// ctx := context.Background()
	// listOptions := github.ListOptions{}
	// opts := github.OrganizationsListOptions{nil, }
	// ghClient.Organizations.ListAll(ctx, )

	return "Hello"
} 