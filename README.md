# 🧠 AppEasy Job Tracker - Technical Assessment

A full-stack Next.js application for tracking job applications with AI-powered job description analysis.

## 🚀 Features

### Frontend (Next.js + TypeScript)

- ✅ **Add Job Applications**: Form to add job details (Title, Company, Link, Status)
- ✅ **Dashboard View**: Clean table displaying all job applications
- ✅ **Edit/Delete**: Full CRUD operations for job entries
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **Real-time Stats**: Dashboard showing application statistics

### Backend (Next.js API Routes)

- ✅ **RESTful API**: Complete CRUD endpoints
  - `GET /api/jobs` - Fetch all jobs
  - `POST /api/jobs` - Create new job
  - `PUT /api/jobs/[id]` - Update job
  - `DELETE /api/jobs/[id]` - Delete job
- ✅ **JSON File Storage**: Persistent data storage without database
- ✅ **TypeScript**: Full type safety across the application

### 🤖 AI Integration (Bonus Feature)

- ✅ **Job Analysis**: Paste job descriptions for AI analysis
- ✅ **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent insights
- ✅ **Smart Recommendations**:
  - Job summary generation
  - 3 key skills to highlight in resume
- ✅ **Fallback Handling**: Graceful error handling with default responses

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **AI**: OpenAI API via Vercel AI SDK
- **Data Storage**: JSON file system
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd job-tracker-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Adding Job Applications

1. Click "Add Job Application" button
2. Fill in the form with job details
3. Select application status
4. Submit to save

### Managing Applications

- **View**: All applications displayed in a clean table
- **Edit**: Click the edit icon to modify any application
- **Delete**: Click the trash icon to remove applications
- **External Links**: Click the link icon to visit job postings

### AI Job Analysis

1. Click "Analyze Job Description" button
2. Paste the job description text
3. Click "Analyze" to get AI insights
4. Review the job summary and skill recommendations

## 🏗️ Project Structure

\`\`\`
job-tracker-app/
├── app/
│ ├── api/
│ │ ├── jobs/
│ │ │ ├── route.ts # GET, POST /api/jobs
│ │ │ └── [id]/route.ts # PUT, DELETE /api/jobs/[id]
│ │ └── analyze-job/
│ │ └── route.ts # POST /api/analyze-job
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx # Main dashboard component
├── components/ui/ # shadcn/ui components
├── data/
│ └── jobs.json # Data storage file
├── lib/
│ └── utils.ts
└── README.md
\`\`\`

## 🔧 API Endpoints

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| GET    | \`/api/jobs\`        | Fetch all job applications      |
| POST   | \`/api/jobs\`        | Create new job application      |
| PUT    | \`/api/jobs/[id]\`   | Update existing job application |
| DELETE | \`/api/jobs/[id]\`   | Delete job application          |
| POST   | \`/api/analyze-job\` | Analyze job description with AI |

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Interactive Elements**: Smooth animations and transitions
- **Status Badges**: Color-coded application statuses
- **Statistics Dashboard**: Visual overview of applications
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Clear indication of processing actions

## 🤖 AI Implementation Details

The AI feature uses the Vercel AI SDK with OpenAI's GPT-3.5-turbo model to:

1. **Analyze Job Descriptions**: Parse and understand job requirements
2. **Generate Summaries**: Create concise job overviews
3. **Recommend Skills**: Identify key skills to highlight
4. **Handle Errors**: Provide fallback responses for reliability

## 🔒 Error Handling

- **API Errors**: Comprehensive error handling with user-friendly messages
- **Validation**: Form validation for required fields
- **Fallbacks**: AI analysis includes fallback responses
- **File System**: Automatic directory creation for data storage

## 🚀 Deployment Ready

This application is ready for deployment on Vercel or any Node.js hosting platform:

- **Environment Variables**: Configured for production
- **Build Optimization**: Next.js optimized build process
- **Static Assets**: Properly configured asset handling
- **API Routes**: Server-side functionality included

## 💡 Future Enhancements

Potential improvements for production use:

- Database integration (PostgreSQL, MongoDB)
- User authentication and multi-user support
- Email notifications for application updates
- Calendar integration for interview scheduling
- Resume parsing and matching
- Application analytics and insights

---

**Built with ❤️ for the AppEasy Technical Assessment**

_This project demonstrates full-stack development skills, AI integration, and modern web development best practices._
\`\`\`
