"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <Card className="w-full max-w-md shadow-lg border-none bg-white/80 backdrop-blur-md">
        <CardContent className="text-center space-y-6 py-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="p-4 rounded-full bg-blue-100 mb-4">
              <MessageCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Start chatting on ChatApp</h1>
            <p className="text-muted-foreground text-sm max-w-sm">
              Connect instantly with friends and groups.  
              Send messages, share files, and stay in touch — all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/users">
              <Button size="lg" className="w-full text-base">
                Start Messaging
              </Button>
            </Link>
          </motion.div>

          <p className="text-xs text-muted-foreground">
            New here? <Link href="/signup" className="underline hover:text-blue-600">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
