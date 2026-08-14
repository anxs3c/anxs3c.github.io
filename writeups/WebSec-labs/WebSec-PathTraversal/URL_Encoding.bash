#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <string>"
    exit 1
fi

INPUT="$1"

first_encode() 
{
    local string="$1"
    local encoded=""
    for (( i=0; i<${#string}; i++ )); do
        printf -v hex '%%%02X' "'${string:$i:1}"
        encoded+="$hex"
    done
    echo "$encoded"
}

FIRST=$(first_encode "$INPUT")
SECOND=$(first_encode "$FIRST")

echo "Original       : $INPUT"
echo "First Encode   : $FIRST"
echo "Double Encode  : $SECOND"