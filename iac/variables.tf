variable "oauth_token" {
  description = "Github token"
  default = ""
}

variable "aws_region" {
  default = "eu-west-1"
}

variable "function_name" {
  default = "eazyskills-lambda"
}

variable "repository" {
  default = "https://github.com/eazytraining/eazyskills-app.git"
}

variable "s3_bucket" {
  default = "bucket-artefacts-application-eazy"
}

variable "s3_key" {
  default = "eazyskills-artefacts/eazyskills_lambda.zip"
}