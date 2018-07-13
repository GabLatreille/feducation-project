import React from 'react';
import {
    SkeletonBodyText,
    SkeletonDisplayText,
    Layout,
} from '@shopify/polaris';

export default function HomeLoading() {
    return (
        <div>
            <Layout>
                <Layout.Section>
                    <SkeletonDisplayText size="extraLarge" />
                </Layout.Section>
                <Layout.Section>
                    <SkeletonBodyText />
                </Layout.Section>
            </Layout>
        </div>
    )
}
