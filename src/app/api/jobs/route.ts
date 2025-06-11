import { type NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface JobApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  applicationLink: string;
  status: "Applied" | "Interviewing" | "Rejected" | "Offer";
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "jobs.json");

async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readJobs(): Promise<JobApplication[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function writeJobs(jobs: JobApplication[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(DATA_FILE, JSON.stringify(jobs, null, 2));
}

export async function GET() {
  try {
    const jobs = await readJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobTitle, companyName, applicationLink, status } = body;

    if (!jobTitle || !companyName || !applicationLink || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const jobs = await readJobs();
    const newJob: JobApplication = {
      id: Date.now().toString(),
      jobTitle,
      companyName,
      applicationLink,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    jobs.push(newJob);
    await writeJobs(jobs);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
