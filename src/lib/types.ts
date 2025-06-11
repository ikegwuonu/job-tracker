export interface JobApplication {
  id: string;
  jobTitle: string;
  companyName: string;
  applicationLink: string;
  status: "Applied" | "Interviewing" | "Rejected" | "Offer";
  createdAt: string;
  updatedAt: string;
}

export interface JobAnalysis {
  summary: string;
  skills: string[];
}
export interface Form {
  jobTitle: string;
  companyName: string;
  applicationLink: string;
  status: JobApplication["status"];
}
export interface ActionStates {
  isAddDialogOpen: boolean;
  jobDescription: string;
  setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Form>>;
  setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
  isAnalyzing: boolean;
  formData: Form;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  jobs: JobApplication[];
  setAnalysis: React.Dispatch<React.SetStateAction<JobAnalysis | null>>;
  isLoading: boolean;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  analysis: JobAnalysis | null;
}
export interface DialogStates {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Form;
  setFormData: React.Dispatch<React.SetStateAction<Form>>;
  isLoading: boolean;
  setJobs: React.Dispatch<React.SetStateAction<JobApplication[]>>;
  jobs: JobApplication[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingJob: React.Dispatch<React.SetStateAction<JobApplication | null>>;
  editingJob: JobApplication | null;
}
