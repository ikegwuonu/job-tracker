"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Briefcase, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Dialog from "@/components/Dialog";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  ActionStates,
  DialogStates,
  JobAnalysis,
  JobApplication,
} from "@/lib/types";
import { statusColors } from "@/lib/data";
import Header from "@/components/Header";
import { Stats } from "fs";
import StatsCard from "@/components/StatsCard";
import Action from "@/components/Action";

export default function JobTracker() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    applicationLink: "",
    status: "Applied" as JobApplication["status"],
  });
  const { toast } = useToast();
  const actionStates: ActionStates = {
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isAnalyzing,
    setIsAnalyzing,
    jobDescription,
    setJobDescription,
    analysis,
    setAnalysis,
    setFormData,
    formData,
    isLoading,
    jobs,
    setIsLoading,
    setJobs,
  };
  const dialogStates: DialogStates = {
    editingJob,
    formData,
    isEditDialogOpen,
    isLoading,
    jobs,
    setEditingJob,
    setFormData,
    setIsEditDialogOpen,
    setIsLoading,
    setJobs,
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== id));
        toast({
          title: "Success",
          description: "Job application deleted successfully",
        });
      } else {
        throw new Error("Failed to delete job");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job application",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (job: JobApplication) => {
    setEditingJob(job);
    setFormData({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      applicationLink: job.applicationLink,
      status: job.status,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsCard jobs={jobs} />
        <Action {...actionStates} />

        <Card>
          <CardHeader>
            <CardTitle>Your Job Applications</CardTitle>
            <CardDescription>
              Manage and track all your job applications in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No job applications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding your first job application.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        {job.jobTitle}
                      </TableCell>
                      <TableCell>{job.companyName}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[job.status]}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(job.applicationLink, "_blank")
                            }
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog {...dialogStates} />
      </div>
      <Toaster />
    </div>
  );
}
