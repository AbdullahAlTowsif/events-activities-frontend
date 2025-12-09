import AnalyticsDashboardLoading from "@/components/modules/Admin/Analytics/AnalyticsDashboardLoading";
import FAQ from "@/components/modules/Home/FAQ";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import TopThreeReviews from "@/components/modules/Home/TopThreeReview";
import Footer from "@/components/shared/Footer";
import Head from "next/head";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Events & Activities</title>
        <meta
          name="description"
          content="The Events & Activities Platform connects individuals who want to participate in local events, sports, or hobbies but lack companions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <HowItWorks />
        <FAQ />
        <Suspense fallback={<AnalyticsDashboardLoading />} >
          <TopThreeReviews />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}
