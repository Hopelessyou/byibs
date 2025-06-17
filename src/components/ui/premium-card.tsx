
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PremiumCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  elevated?: boolean;
  interactive?: boolean;
  glossy?: boolean;
  gradient?: string;
  children?: React.ReactNode;
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ title, description, footer, bordered = false, elevated = false, interactive = false, glossy = false, gradient, children, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'overflow-hidden bg-white/80 backdrop-blur-sm transition-all duration-300',
          bordered && 'border-premium',
          elevated && 'shadow-premium',
          interactive && 'card-3d hover:shadow-premium',
          glossy && 'glossy-effect',
          gradient && gradient,
          className
        )}
        {...props}
      >
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle className="font-playfair">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';

export { PremiumCard };
