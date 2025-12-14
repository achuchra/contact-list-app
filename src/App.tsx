import { Footer, Header, PersonInfoList } from "src/components";
import { PersonsProvider } from "src/contexts";

export const App = () => {
  return (
    <PersonsProvider>
      <Header />
      <main>
        <PersonInfoList />
      </main>
      <Footer />
    </PersonsProvider>
  );
};
