import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { helpFormSchema, HelpFormData } from "@/schema/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Category, HelpType } from "@/types/enums";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createHelpRequest } from "@/services/apiService";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { queryClient } from "@/App";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { handleApiError } from "@/utils/handleApiError";

function CreateHelpForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HelpFormData>({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      categories: [],
    },
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation<void, Error, HelpFormData>({
    mutationFn: createHelpRequest,
    onSuccess: () => {
      toast.success("Help Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["myHelpRequests"] });
      navigate("/my-help-requests");
    },
    onError: handleApiError,
  });

  useAuth();

  const onSubmit = (data: HelpFormData) => {
    mutate(data);
  };

  const handleCategoryChange = (value: Category) => {
    const current = watch("categories");

    if (current.includes(value)) {
      if (current.length === 1) return;
      setValue(
        "categories",
        current.filter((cat) => cat !== value) as Category[]
      );
    } else {
      setValue("categories", [...current, value] as Category[]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground text-center">
        Create a Help Request
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto sm:p-6 p-2 bg-background rounded-xl shadow"
        encType="multipart/form-data"
      >
        <Input placeholder="Title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Textarea
          placeholder="Description"
          {...register("description")}
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <Textarea placeholder="Reward" {...register("reward")} rows={2} />
        {errors.reward && (
          <p className="text-red-500 text-sm">{errors.reward.message}</p>
        )}

        <Input placeholder="Area" {...register("area")} />
        {errors.area && (
          <p className="text-red-500 text-sm">{errors.area.message}</p>
        )}

        <Input placeholder="City" {...register("city")} />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}

        <Input placeholder="State" {...register("state")} />
        {errors.state && (
          <p className="text-red-500 text-sm">{errors.state.message}</p>
        )}

        <Input placeholder="Country" {...register("country")} />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}

        <Input placeholder="Pincode" {...register("pincode")} />
        {errors.pincode && (
          <p className="text-red-500 text-sm">{errors.pincode.message}</p>
        )}

        <Controller
          name="helpImage"
          control={control}
          render={({ field }) => (
            <Input
              type="file"
              accept=".jpg"
              className="block w-full text-sm text-muted-foreground bg-background border border-input rounded-lg cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
          )}
        />

        {errors.helpImage && (
          <p className="text-red-500 text-sm">{errors.helpImage.message}</p>
        )}

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Help Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(HelpType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}

        <div>
          <p className="font-medium mb-2">Select Categories</p>
          <div className="flex flex-wrap gap-2">
            {Object.values(Category).map((cat) => (
              <Button
                type="button"
                key={cat}
                variant={
                  watch("categories").includes(cat) ? "default" : "outline"
                }
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "rounded-full text-xs font-medium transition-colors",
                  watch("categories").includes(cat)
                    ? "text-white bg-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>

        <div className="flex justify-end mr-5">
          <Button
            type="submit"
            className="mt-4 text-white"
            disabled={isPending}
          >
            {isPending ? <SyncLoader color="#fff" size={10} /> : "Submit Help"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateHelpForm;
