import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import HeroForm from '@/components/forms/HeroForm';
import { Page } from '@/models/Page';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';

export default async function Home() {
  const session = await getServerSession(authOptions);
  await mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <main>
      <section className='pt-32'>
        <div className='max-w-md mb-8'>
          <h1 className='text-6xl font-bold'>
            Your one link
            <br />
            for everything
          </h1>
          <h2 className='text-gray-500 text-xl mt-6'>
            Share your links, social profiles, contact info and more on one page
          </h2>
        </div>
        <HeroForm
          user={session?.user}
          isAlreadyMade={page !== null}
          pageUri={page?.uri}
        />
      </section>
    </main>
  );
}
