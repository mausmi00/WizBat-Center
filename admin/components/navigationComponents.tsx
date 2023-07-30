import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavProps {
  name: string;
  href: string;
}

const NavigationComponents: React.FC<NavProps> = ({ name, href }) => {
  const params = useParams();
  
 return (
    <div className="flex h-10 w-[150px] items-center justify-between rounded-md border border-input bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
    
        <div className="hover:bg-[#0c2632] hover:cursor-pointer w-full rounded-sm items-center py-1.5 text-sm mx-2">
          <Link
            key={name}
            href={`/${params.storeId}/${href}`}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            {name}
          </Link>
        </div>
      
    </div>
  );
};

{
  /* <SelectContent>
        <div className="hover:bg-[#0c2632] w-full rounded-sm items-center py-1.5 text-sm">
          <Link
            key={name}
            href={`/${params.storeId}/${href}`}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary"
            )}
          >
            {name}
          </Link>
        </div>
      </SelectContent> */
}

export default NavigationComponents;
