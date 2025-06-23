import { createClient } from "@/prismicio";
import React from 'react'

import { StickyNavigationWrapper } from "./StickyNavigationWrapper";
import { NavigationContent } from "./NavigationContent";

export default async function NavigationBar() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    const navigation = await client.getSingle("navigation");

    return (
        <StickyNavigationWrapper>
            <header className="py-4 px-6">
                <NavigationContent settings={settings} navigation={navigation} />
            </header>
        </StickyNavigationWrapper>
    )
}
