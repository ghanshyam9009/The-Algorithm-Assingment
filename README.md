⚙️ Project Setup Instructions
🪜 1. Clone the Repository
git clone  https://github.com/ghanshyam9009/The-Algorithm-Assingment.git
cd  src
🧩 2. Install Dependencies
npm install
🧾 3. Environment Variables
Create a .env file in the src folder:
.env file is attached on mail
▶️ 5. Run the Server
node server.js
✅ 6. Server Running At
http://localhost:4000




🏢 Organization APIs
➤ POST /api/organizations
Create a new organization
Request Body
{
  "name": "TechCorp Pvt Ltd"
}
Response
{
  "_id": "67325d8d9a6f7b6b09f12345",
  "name": "TechCorp Pvt Ltd",
  "createdAt": "2025-11-11T07:34:05.281Z"
}


________________________________________
👤 User APIs
➤ POST /api/users
Create a user and link with organization
Request Body
{
  "name": "Alice Johnson",
  "email": "alice@techcorp.com",
  "organizationId": "67325d8d9a6f7b6b09f12345",
  "role": "admin"
}
Response
{
  "_id": "6732604c9a6f7b6b09f67890",
  "name": "Alice Johnson",
  "email": "alice@techcorp.com",
  "organizationId": "67325d8d9a6f7b6b09f12345",
  "role": "admin"
}



____________________________________
📁 File APIs
➤ POST /api/files/upload
Upload file using Multer stream

Form Data

file	           	File to upload
uuserId         	String	User ID of uploader

Response
{
  "message": "uploaded",
  "file": {
    "_id": "673262c69a6f7b6b09f99999",
    "fileName": "myResume.pdf",
    "filePath": "uploads/1731321252000-myResume.pdf",
    "uploadedBy": "6732604c9a6f7b6b09f67890",
    "createdAt": "2025-11-11T07:40:52.123Z"
  }
}





________________________________________
➤ GET /api/files/download/:id
Download file using stream
Example URL
GET /api/files/download/673262c69a6f7b6b09f99999
Response
•	Downloads the file as an attachment.






________________________________________
📊 Analytics APIs
➤ GET /api/analytics/users-by-organization
Aggregation: Count of users per organization
Response
[
  {
    "organizationId": "67325d8d9a6f7b6b09f12345",
    "organizationName": "TechCorp Pvt Ltd",
    "count": 3
  }
]
____




____________________________________
➤ GET /api/analytics/organization-files
Aggregation: Organization name, total files uploaded, and list of users
Response
[
  {
    "organizationId": "67325d8d9a6f7b6b09f12345",
    "organizationName": "TechCorp Pvt Ltd",
    "totalFiles": 5,
    "users": ["Alice Johnson", "Bob Smith"]
  }
]
______



__________________________________
📋 API Summary Table

Category       	Method         	Endpoint                                 	Request Body	                                Description

Organization   	POST	          /api/organizations                       	{ name }	                                    Create new organization
User	          POST	          /api/users	                              { name, email, organizationId, role }       	Create user
File	          POST          	/api/files/upload	                         form-data: file, uploadedBy	                Upload file
File	          GET           	/api/files/download/:id	                   Path param: id	                              Download file
Analytics	      GET           	/api/analytics/users-by-organization	      
Analytics     	GET           	/api/analytics/organization-files

