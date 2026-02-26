resource "aws_lambda_function" "eazyskills_lambda" {
  function_name = var.function_name
  role          = aws_iam_role.eazyskills_lambda_role.arn
  handler       = "app.main.handler"
  runtime       = "python3.10"
  timeout       = 60
  s3_bucket     = var.s3_bucket
  s3_key        = "eazyskills-artefacts/${var.s3_key}"

  environment {
    variables = {
      BACKEND_BASE_URL = aws_apigatewayv2_api.eazyskills_api.api_endpoint
      OPENAI_API_KEY   = "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"
    }
  }
}
