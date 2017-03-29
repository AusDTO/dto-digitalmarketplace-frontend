#!/bin/bash
LASTTAG=$(git describe --abbrev=0 --tags HEAD~1)
GITLOG=$(git log --format="%cd %s" --date=short $LASTTAG...HEAD | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/\\n/g')
PAYLOAD='{"channel": "#marketplace", "icon_emoji": ":lightning:","username": "releasebot",
 "attachments": [ { "fallback": "A new frontend went live!",
 "pretext": "A new frontend went live! '"$CIRCLE_REPOSITORY_URL"'/releases/tag/'"$CIRCLE_TAG"'",
 "text": "'"$GITLOG"'" }] }'

#echo $PAYLOAD
curl -g -X POST --data-urlencode "payload=$PAYLOAD" "$SLACK_WEBHOOK_URL"