resource "aws_apigatewayv2_api" "eazyskills_api" {
  name          = "eazyskills-api"
  protocol_type = "HTTP"
}


resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.eazyskills_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.eazyskills_api.execution_arn}/*/*"
}


resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.eazyskills_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.eazyskills_lambda.invoke_arn
}


resource "aws_apigatewayv2_route" "chat" {
  api_id    = aws_apigatewayv2_api.eazyskills_api.id
  route_key = "POST /chat"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


resource "aws_apigatewayv2_route" "courses" {
  api_id    = aws_apigatewayv2_api.eazyskills_api.id
  route_key = "GET /courses"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


resource "aws_apigatewayv2_route" "faqs" {
  api_id    = aws_apigatewayv2_api.eazyskills_api.id
  route_key = "GET /faqs"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


resource "aws_apigatewayv2_route" "paths" {
  api_id    = aws_apigatewayv2_api.eazyskills_api.id
  route_key = "GET /paths"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}


resource "aws_apigatewayv2_route" "bootcamps" {
  api_id    = aws_apigatewayv2_api.eazyskills_api.id
  route_key = "GET /bootcamps"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.eazyskills_api.id
  name        = "$default"
  auto_deploy = true
}


output "api_gateway_url" {
  description = "L'URL de l'API Gateway HTTP"
  value = aws_apigatewayv2_stage.prod.invoke_url
}
