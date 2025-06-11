import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { DialogStates, Form, JobApplication } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

const Dialogs = ({
  isEditDialogOpen,
  editingJob,
  setEditingJob,
  setIsEditDialogOpen,
  formData,
  setFormData,
  isLoading,
  jobs,
  setIsLoading,
  setJobs,
}: DialogStates) => {
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/api/jobs/${editingJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJobs(
          jobs.map((job) => (job.id === editingJob.id ? updatedJob : job))
        );
        setIsEditDialogOpen(false);
        setEditingJob(null);
        toast({
          title: "Success",
          description: "Job application updated successfully",
        });
      } else {
        throw new Error("Failed to update job");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job Application</DialogTitle>
          <DialogDescription>
            Update the details of your job application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <Label htmlFor="editJobTitle">Job Title</Label>
            <Input
              id="editJobTitle"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="editCompanyName">Company Name</Label>
            <Input
              id="editCompanyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="editApplicationLink">Application Link</Label>
            <Input
              id="editApplicationLink"
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
            <Label htmlFor="editStatus">Status</Label>
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
            {isLoading ? "Updating..." : "Update Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Dialogs;
