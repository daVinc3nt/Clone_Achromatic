"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mostVisitedContacts = [
  { name: "Airbnb", icon: "🌐", visits: 0 },
  { name: "Microsoft", icon: "💻", visits: 0 },
  { name: "Google", icon: "🔍", visits: 0 },
  { name: "Nvidia", icon: "🎮", visits: 0 },
  { name: "Tesla", icon: "🚗", visits: 0 },
  { name: "Adobe", icon: "🎨", visits: 0 },
];

export default function LeadGenerationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most visited contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mostVisitedContacts.map((contact, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>{contact.icon}</span>
                <span>{contact.name}</span>
              </div>
              <span>{contact.visits}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
