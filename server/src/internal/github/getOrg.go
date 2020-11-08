package github

import (
	"context"
	"github.com/google/go-github/github"
	"github.com/kletskovg/typecode/server/src/internal/consts"
	"github.com/kletskovg/typecode/server/src/internal/utils"
	log "github.com/sirupsen/logrus"
)

func GetRandomOrg(language string) (*github.Repository, error) {
	appliedOrgs := consts.AppliedOrgs()
	utils.ShuffleStrings(appliedOrgs)
	for i := range appliedOrgs {
		repo, err := tryToFindRepo(appliedOrgs[i], language)

		if err != nil {
			return nil, err
		} else if repo != nil {
			return repo, nil
		}
	}

	return nil, nil
}


func tryeToFindRepo(organization string, language string) (*github.Repository , error){
	ctx := context.Background()
	client := github.NewClient(nil)
	searchQuery := "org:" + organization + "+language:" + language 
	result, _, err := client.Search.Repositories(ctx, searchQuery, nil)

	if err != nil {
		log.Error(err.Error())
		return nil, err
	} else if result != nil {
		return nil, nil
	} else {
		repo := result.Repositories[utils.GetRandomElement(len(result.Repositories))]
		log.WithFields(log.Fields{
			"repo": repo,
		}).Info("Successfully find repo")
		return &repo, nil
	}
}