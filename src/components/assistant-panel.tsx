import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { buildAssistantAnswer } from '@/services/intelligence';
import { cn } from '@/lib/utils';

const prompts = [
  'Compare Figure and Optimus',
  'Show the cheapest robots',
  'Who has the best dexterity',
  'What changed this month',
  'Which companies are hiring',
  'Show robots capable of warehouse work',
];

type AssistantPanelProps = {
  className?: string;
};

export function AssistantPanel({ className }: AssistantPanelProps) {
  const [question, setQuestion] = useState(prompts[0]);
  const [draft, setDraft] = useState('');

  const response = useMemo(() => buildAssistantAnswer(question), [question]);

  return (
    <Card className={cn('border-border/70 bg-card/80 shadow-[0_20px_60px_rgba(0,0,0,0.3)]', className)}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-sm uppercase tracking-[0.18em] text-foreground">AI Assistant</CardTitle>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <Button
              key={prompt}
              variant={question === prompt ? 'default' : 'secondary'}
              size="sm"
              className="rounded-full"
              onClick={() => setQuestion(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask a follow-up in natural language..."
          className="min-h-[110px] resize-none"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (draft.trim()) {
                setQuestion(draft.trim());
                setDraft('');
              }
            }}
          >
            Ask assistant
          </Button>
          <Button variant="ghost" onClick={() => setQuestion(prompts[0])}>
            Reset
          </Button>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Answer</div>
          <p className="mt-2 text-sm leading-6 text-foreground">{response.answer}</p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {response.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="mt-2 size-1.5 rounded-full bg-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

