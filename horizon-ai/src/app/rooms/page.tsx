'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  
  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8" data-lk-theme="default">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/livekit-meet-home.svg" 
              alt="LiveKit Meet" 
              width="360" 
              height="45"
              className="h-auto w-auto"
            />
          </div>
          <CardTitle className="text-xl font-medium">
            Open source video conferencing app built on{' '}
            <a 
              href="https://github.com/livekit/components-js?ref=meet" 
              className="text-primary hover:text-primary/90 underline decoration-primary/30" 
              rel="noopener"
            >
              LiveKit&nbsp;Components
            </a>
            ,{' '}
            <a 
              href="https://livekit.io/cloud?ref=meet" 
              className="text-primary hover:text-primary/90 underline decoration-primary/30" 
              rel="noopener"
            >
              LiveKit&nbsp;Cloud
            </a>{' '}
            and Next.js.
          </CardTitle>
          <CardDescription className="mt-2 text-lg">
            Try LiveKit Meet for free with our live demo project.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={
            <div className="flex justify-center">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
          }>
            <div className="space-y-6">
              <Button 
                size="lg"
                className="w-full"
                onClick={startMeeting}
              >
                Start Meeting
              </Button>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-e2ee"
                    checked={e2ee}
                    onCheckedChange={(checked) => setE2ee(checked as boolean)}
                  />
                  <Label 
                    htmlFor="use-e2ee"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enable end-to-end encryption
                  </Label>
                </div>

                {e2ee && (
                  <div className="space-y-2">
                    <Label htmlFor="passphrase">Passphrase</Label>
                    <Input
                      id="passphrase"
                      type="password"
                      value={sharedPassphrase}
                      onChange={(ev) => setSharedPassphrase(ev.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      This passphrase will be used to encrypt your meeting. Make sure to share it securely with participants.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}