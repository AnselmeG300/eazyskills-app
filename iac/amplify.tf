resource "aws_amplify_app" "eazyskills_amplify" {
  name       = "eazyskills-amplify"
  repository = "https://github.com/eazytraining/eazyskills-app.git"

  oauth_token = var.oauth_token

  build_spec = file("amplify.yml")
}


resource "aws_amplify_branch" "eazyskills_amplify_branch" {
  app_id      = aws_amplify_app.eazyskills_amplify.id
  branch_name = "main"
  enable_auto_build = true
  framework = "Next.js - SSR"
  stage     = "PRODUCTION"
}

