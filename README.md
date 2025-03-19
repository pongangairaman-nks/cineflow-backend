# Tech Stack

express - Main Backend Framework
cors - Cross Origin Resource Sharing to allow Next.js to talk to the Backend
dotenv - Environment variable Management
mongoose - ORM for complex queries
jsonwebtoken - Secure authentication
bcryptjs - For password hashing
multer - For file uploads, for videos
ffmpeg or fluent-ffmpeg - Video Transcoding for HLS streaming
stripe - Payment Processing
nodemailer - Email service
bullmq - Background job processing

## Tasks

Create a REST API to manage users, videos, and payments. The API should have the following endpoints

- amount,currency, email for payment from the body

# FEATURE | REST API | GRAPHQL API

# ------------------------------------------------------------------------------------------------------------------

# Fetching Data | Calls Multiple End points | Calling a single request

# | Eg: VideoById -> route "/videoById", | Eg: route -> "/graphql"

# | VideoByIdAndComments -> route "/videoById&Comment |

# ------------------------------------------------------------------------------------------------------------------

# Overfetching | Return extra data that are not needed | Returns only requested data

# ------------------------------------------------------------------------------------------------------------------

# Uderfetching | Requires multiple requests to fetch related data | Fetches everything in one single go

# ------------------------------------------------------------------------------------------------------------------

# Request Efficiency | Multiple calls | Single call

# ------------------------------------------------------------------------------------------------------------------

Query

query {

  <!-- fetch all videos from the database -->

getAllVideos {  
 \_id <!-- fetch video id -->
title
likes
likesBy {
\_id
createdAt
userId
videoId
}
comments {
text
createdAt
}
}
}
