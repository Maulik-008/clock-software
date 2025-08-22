import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { Send, Loader2 } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_PUBLIC_KEY,
} from "@/lib/emailjs";

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  message: z
    .string()
    .min(5, { message: "Message is required (min 5 characters)" }),
});

type FormData = z.infer<typeof formSchema>;

const FeedbackForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const closeDialogRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: data.name,
          message: data.message,
        },
        EMAIL_PUBLIC_KEY
      );

      if (result.status === 200) {
        toast({
          title: "Feedback sent!",
          description: "Thank you for your feedback.",
          variant: "default",
        });
        reset();
        // Close dialog after successful submission
        if (closeDialogRef.current) {
          closeDialogRef.current.click();
        }
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast({
        title: "Error sending feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
      <div className="space-y-2">
        <Input
          id="name"
          placeholder="Your Name"
          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-400 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          id="message"
          placeholder="Your Feedback or Issue"
          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px]"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-400 text-xs">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <DialogClose asChild>
          <Button
            ref={closeDialogRef}
            type="button"
            variant="outline"
            className="border-gray-700 text-gray-300 bg-gray-800 "
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" /> Send Feedback
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
