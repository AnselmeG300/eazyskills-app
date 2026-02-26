resource "aws_iam_role" "eazyskills_lambda_role" {
  name = "eazyskills-lambda-role"

  assume_role_policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow"
      }
    ]
  }
  EOF
}


resource "aws_iam_policy" "eazyskills_lambda_logging_policy" {
  name        = "eazyskills-lambda-logging-policy"
  description = "IAM policy for logging from a Lambda function"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "logs:CreateLogGroup",
        "Resource" : "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : [
          "arn:aws:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${var.function_name}:*"
        ]
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "eazyskills_lambda_logging_attachment" {
  role       = aws_iam_role.eazyskills_lambda_role.name
  policy_arn = aws_iam_policy.eazyskills_lambda_logging_policy.arn
}
