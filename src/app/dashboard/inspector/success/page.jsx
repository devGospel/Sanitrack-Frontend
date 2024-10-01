import Image from 'next/image';
import Link from 'next/link';

const RequestSuccess = () => {
  return (
    <div className=' flex h-screen max-h-screen px-[5%] w-full'>
      <div className=' flex flex-col w-full justify-center gap-5'>
        <section className='flex flex-col items-center gap-4'>
          <Image src='/done.png' height={200} width={200} alt='success' />
          <h2 className='text-lg font-semibold mb-2 max-w-[600px] text-center'>
            Your <span className='text-green-500'>Work Order Closed</span>{' '}
            successfully!
          </h2>
          <p className='text-sm font-semibold mb-2 max-w-[600px] text-center'>
            Your task has been submitted
          </p>
        </section>

        <button className='btn btn-primary'>
          <Link href={`/dashboard/inspector`}>Finish</Link>
        </button>
      </div>
    </div>
  );
};

export default RequestSuccess;
