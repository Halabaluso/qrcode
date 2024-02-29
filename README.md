
# CodeConnect

An open source project to generate users and identify them with a QR code.


## Important settings

This project uses Firestore. A firebase NoSQL database.

To run this project, you need to configure a Firestore database and add the following parameters provided by firebase in the .env of the project.

```bash
  type = "..."
  project_id = "..."
  private_key_id = "..."
  private_key = "..."
  client_email = "..."
  client_id = "..."
  auth_uri = "..."
  token_uri = "..."
  auth_provider_x509_cert_url = "..."
  client_x509_cert_url = "..."
  universe_domain = "..."
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/Halabaluso/qrcode.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

To deploy this project run

```bash
  npm run build
```



