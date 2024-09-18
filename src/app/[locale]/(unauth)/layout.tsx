import { unstable_setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Rooms } from '@/components/Rooms';
export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);


  return (
    <><Rooms />
      <Navbar />
      
      <div className=''>{props.children}</div>
      <Footer />
    </>
  );
}
