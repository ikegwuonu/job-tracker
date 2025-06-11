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

async function readJobs(): Promise<JobApplication[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeJobs(jobs: JobApplication[]): Promise<void> {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(jobs, null, 2));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { jobTitle, companyName, applicationLink, status } = body;

    if (!jobTitle || !companyName || !applicationLink || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const jobs = await readJobs();
    const jobIndex = jobs.findIndex((job) => job.id === id);

    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    jobs[jobIndex] = {
      ...jobs[jobIndex],
      jobTitle,
      companyName,
      applicationLink,
      status,
      updatedAt: new Date().toISOString(),
    };

    await writeJobs(jobs);

    return NextResponse.json(jobs[jobIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const jobs = await readJobs();
    const filteredJobs = jobs.filter((job) => job.id !== id);

    if (jobs.length === filteredJobs.length) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await writeJobs(filteredJobs);

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
