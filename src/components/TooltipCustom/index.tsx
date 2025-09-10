import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface TooltipCustomProps {
  trigger: string | React.ReactElement;
  content: string | React.ReactElement;
}

export function TooltipCustom({ trigger, content }: TooltipCustomProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-white font-medium">
            {trigger}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-white font-medium">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}