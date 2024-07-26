"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Copy, Server } from "lucide-react"
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMapa: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin"
}
const variantMapa: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive"
}

export const ApiALert = ({ title, description, variant = "public" }: ApiAlertProps) => {
  const { toast } = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast({description: "Failed to create store"});
  }
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMapa[variant]}>{textMapa[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded-md bg-muted px-[0.2rem] font-mono font-semibold">{description}</code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
      </Button>
      </AlertDescription>
    </Alert>
  )
}