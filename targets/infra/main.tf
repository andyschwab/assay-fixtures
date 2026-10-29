# The notes service's backup bucket: planted misconfigurations (ANSWERS.yaml P-02).
resource "aws_s3_bucket" "backups" {
  bucket = "notesbox-backups"
}
