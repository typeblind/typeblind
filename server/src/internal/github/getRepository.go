package github

import (
	"github.com/kletskovg/typecode/server/src/internal/consts"
	"github.com/kletskovg/typecode/server/src/internal/utils"
	"github.com/google/go-github/github"
)

// Returns random repository from list of all applied orgs
func GetRepository() {
	appliedOrgs := consts.AppliedOrgs()
	randomOrgIndex := utils.GetRandomElement(len(appliedOrgs))
	currentOrgUrl := appliedOrgs[randomOrgIndex]

	ghClient := github.NewClient(nil)
	// Get Organization Repositories from URL
	// Get Current Repository
	// Return it
}