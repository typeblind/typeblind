package github

import (
	"context"
	"github.com/google/go-github/github"
	"github.com/kletskovg/typecode/server/src/internal/consts"
	"github.com/kletskovg/typecode/server/src/internal/utils"
	log "github.com/sirupsen/logrus"
)

func GetRandomOrg(language string) (*github.Organization, error) {
	ctx := context.Background()
	client := github.NewClient(nil)

	appliedOrgs := consts.AppliedOrgs()
	utils.ShuffleStrings(appliedOrgs)
	certainOrg := appliedOrgs[0]
	orgData, _, err := client.Organizations.Get(ctx, certainOrg)
	
	if err != nil  {
		log.Error("Error during get organization " + err.Error())
		return nil, err
	} else {
		log.WithFields(log.Fields{
			"organization": orgData,
		}).Info("Get orgs success")
		return orgData, nil
	}
}