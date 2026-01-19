import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { CheckCircle2, Upload } from "lucide-react";
import { submitExpertToSheets, type ExpertSubmission } from "@/lib/sheets";

const formSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  linkedinLink: z.string().trim().url({ message: "Please enter a valid LinkedIn URL" }).max(500),
  yearsOfExperience: z.string().trim().min(1, { message: "Please specify years of experience" }).max(50),
  expertiseAreas: z.string().trim().min(2, { message: "Please specify at least one area" }).max(500),
  phoneNumber: z.string().trim().max(20).optional(),
  currentRole: z.string().trim().max(100).optional(),
  currentCompany: z.string().trim().max(100).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to being contacted",
  }),
  feedback: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const ExpertForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
      feedback: false,
    },
  });

  const consent = watch("consent");
  const feedback = watch("feedback");

  const onSubmit = async (data: FormData) => {
    try {
      const submission: ExpertSubmission = {
        fullName: data.fullName,
        email: data.email,
        linkedinLink: data.linkedinLink,
        yearsOfExperience: data.yearsOfExperience,
        expertiseAreas: data.expertiseAreas,
        phoneNumber: data.phoneNumber,
        currentRole: data.currentRole,
        currentCompany: data.currentCompany,
        consent: data.consent,
        feedback: data.feedback,
        resumeFileName: selectedFile?.name ?? null,
        resumeFile: selectedFile,
      };
      await submitExpertToSheets(submission);

      setIsSubmitted(true);
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      setSelectedFile(file);
      toast.success("Resume uploaded successfully");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          We've received your information and will reach out when relevant consulting opportunities become available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="John Doe"
            className="transition-all duration-200 focus:shadow-soft"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="transition-all duration-200 focus:shadow-soft"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinLink">LinkedIn Profile *</Label>
        <Input
          id="linkedinLink"
          {...register("linkedinLink")}
          placeholder="https://linkedin.com/in/your-profile"
          className="transition-all duration-200 focus:shadow-soft"
        />
        {errors.linkedinLink && (
          <p className="text-sm text-destructive">{errors.linkedinLink.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
          <Input
            id="yearsOfExperience"
            {...register("yearsOfExperience")}
            placeholder="e.g., 5-7 years"
            className="transition-all duration-200 focus:shadow-soft"
          />
          {errors.yearsOfExperience && (
            <p className="text-sm text-destructive">{errors.yearsOfExperience.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
          <Input
            id="phoneNumber"
            {...register("phoneNumber")}
            placeholder="+1 (555) 000-0000"
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertiseAreas">Expertise Area(s) *</Label>
        <Textarea
          id="expertiseAreas"
          {...register("expertiseAreas")}
          placeholder="e.g., Fintech, Biotech, AI Safety, Telecommunications, Marketing"
          rows={3}
          className="transition-all duration-200 focus:shadow-soft resize-none"
        />
        {errors.expertiseAreas && (
          <p className="text-sm text-destructive">{errors.expertiseAreas.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="currentRole">Current Role / Title (Optional)</Label>
          <Input
            id="currentRole"
            {...register("currentRole")}
            placeholder="Senior Product Manager"
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentCompany">Current Company (Optional)</Label>
          <Input
            id="currentCompany"
            {...register("currentCompany")}
            placeholder="Tech Corp or Independent"
            className="transition-all duration-200 focus:shadow-soft"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Upload Resume/CV (Optional)</Label>
        <div className="flex items-center gap-3">
          <Input
            id="resume"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("resume")?.click()}
            className="w-full transition-all duration-200 hover:shadow-soft"
          >
            <Upload className="w-4 h-4 mr-2" />
            {selectedFile ? selectedFile.name : "Choose File"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          PDF or Word document, max 10MB
        </p>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-start gap-2">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setValue("consent", checked as boolean)}
            className="mt-1 rounded-none"
          />
          <div className="space-y-1">
            <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
              I consent to being contacted about expert projects. My information will be kept confidential and only used to connect me with relevant consulting opportunities. *
            </Label>
            {errors.consent && (
              <p className="text-sm text-destructive">{errors.consent.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="feedback"
            checked={feedback}
            onCheckedChange={(checked) => setValue("feedback", checked as boolean)}
            className="mt-1 rounded-none"
          />
          <Label htmlFor="feedback" className="text-sm font-normal cursor-pointer">
            I'm interested in providing feedback on how expert networks can be improved
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-soft hover:shadow-medium text-base py-6"
      >
        {isSubmitting ? "Submitting..." : "Join the Waitlist"}
      </Button>
    </form>
  );
};
