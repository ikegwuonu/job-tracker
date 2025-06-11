import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Brain, Plus } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ActionStates, JobApplication } from "@/lib/types";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { toast } from "@/hooks/use-toast";

const Action = ({
  setFormData,
  jobDescription,
  setIsAnalyzing,
  isAnalyzing,
  formData,
  setIsLoading,
  setIsAddDialogOpen,
  isAddDialogOpen,
  setJobs,
  jobs,
  setAnalysis,
  isLoading,
  setJobDescription,
  analysis,
}: ActionStates) => {
  const [isAnalyzeDialogOpen, setIsAnalyzeDialogOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newJob = await response.json();
        setJobs([...jobs, newJob]);
        setFormData({
          jobTitle: "",
          companyName: "",
          applicationLink: "",
          status: "Applied",
        });
        setIsAddDialogOpen(false);
        toast({
          title: "Success",
          description: "Job application added successfully",
        });
      } else {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add job application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      jobTitle: "",
      companyName: "",
      applicationLink: "",
      status: "Applied",
    });
  };

  const analyzeJobDescription = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (response.ok) {
        const analysisResult = await response.json();
        setAnalysis(analysisResult);
      } else {
        throw new Error("Failed to analyze job description");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze job description",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  return (
    <div className="flex gap-4 mb-6">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={resetForm}>
            <Plus className="mr-2 h-4 w-4" />
            Add Job Application
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Job Application</DialogTitle>
            <DialogDescription>
              Fill in the details of your job application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="applicationLink">Application Link</Label>
              <Input
                id="applicationLink"
                type="url"
                value={formData.applicationLink}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    applicationLink: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as JobApplication["status"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isAnalyzeDialogOpen} onOpenChange={setIsAnalyzeDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Brain className="mr-2 h-4 w-4" />
            Analyze Job Description
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Job Analysis</DialogTitle>
            <DialogDescription>
              Paste a job description to get AI-powered insights and skill
              recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
              />
            </div>
            <Button onClick={analyzeJobDescription} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>

            {analysis && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Job Summary</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {analysis.summary}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Recommended Skills to Highlight
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Action;
