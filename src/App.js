import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminGuard from "./components/Layout/Guard/AdminGuard";
import QuanLiBoDe from "./pages/admin/tracNghiem";
import Homepage from "./pages/home";
import NotFound from "./components/Common/NotFound";
import CreateQuestion from "./pages/admin/tracNghiem/CreateQuestion";
import ClientGuard from "./components/Layout/Guard/ClientGuard";
import PuzzleGame from "./pages/puzzle";
import Quiz from "./pages/quiz";
import QuizRule from "./pages/quiz/QuizRule";
import TreasureRule from "./pages/treasure/TreasureRule";
import Treasure from "./pages/treasure";
import Summary from "./pages/quiz/summary";
import Login from "./pages/auth/Login";
import { useCallback, useEffect } from "react";
import Obstacle from "./pages/obstacle/index.jsx";
import SummaryTuLuan from "./pages/treasure/SummaryTuLuan.jsx";
import CreateTuLuan from "./pages/admin/dienDapAn/CreateTuLuan.jsx";
import QuanLiTuLuan from "./pages/admin/dienDapAn/index.jsx";
import ChooseQuiz from "./pages/quiz/ChooseQuiz.jsx";
import EditQuestion from "./pages/admin/tracNghiem/EditQuestion.jsx";
import ChooseBoDe from "./pages/treasure/ChooseBoDe.jsx";
import Rule from "./pages/obstacle/Rule.jsx";
import Register from "./pages/auth/Register.jsx";
import { getApi } from "./services/fetchData.js";
import { useAuthStore } from "./store/authStore.js";
import ResultUser from "./pages/result/ResultUser.jsx";
import CrossWordForm from "./pages/crossWord/CrossWordForm.jsx";
import CollageForm from "./pages/collage/CollageForm.jsx";
import EditQuestionEssay from "./pages/admin/dienDapAn/EditQuestionEssay.jsx";

function App() {
  // TODO: get init state
  // const { quizQuestions, updateQuizQuestions } = useAppStore();
  // const { auth, authActionSet } = useAppStore();
  const authAction = useAuthStore((store) => store.authAction);

  const handleGetInformationLogin = useCallback(async () => {
    const res = await getApi("refresh_token");
    if (res && res.data && res.data.success) {
      // Lưu thông tin đăng nhập vào store
      authAction(res.data);
    }
  }, [authAction]);

  // Khi lần đầu tiên vào trang thì sẽ cần kiểm trả người dùng đã login lần trước hay chưa, nếu rồi thì lấy lại thông tin của người đó thông qua refresh_token
  useEffect(() => {
    // actionAuth.refreshAction(dispatch);
    // Lưu thông tin người dùng vào store để sử dụng ở nhiều nơi
    const logged = localStorage.getItem("logged");
    if (logged) {
      handleGetInformationLogin();
    }
  }, [handleGetInformationLogin]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/result-user" element={<ResultUser />} />

        <Route
          path="/"
          element={
            <ClientGuard>
              <Homepage />
            </ClientGuard>
          }
        />

        <Route
          path="/puzzle"
          element={
            <ClientGuard hasBack={true}>
              <PuzzleGame />
            </ClientGuard>
          }
        />
        <Route
          path="/truy-tim-bao-vat"
          element={
            <ClientGuard hasBack={true}>
              <Quiz />
            </ClientGuard>
          }
        />
        <Route
          path="/truy-tim-bao-vat-rule"
          element={
            <ClientGuard hasBack={true}>
              <QuizRule />
            </ClientGuard>
          }
        />
        <Route
          path="/truy-tim-bao-vat-choose"
          element={
            <ClientGuard hasBack={true}>
              <ChooseQuiz />
            </ClientGuard>
          }
        />
        <Route
          path="/truy-tim-bao-vat-summary"
          element={
            <ClientGuard>
              <Summary />
            </ClientGuard>
          }
        />
        <Route
          path="/giai-ma-kho-bau-rule"
          element={
            <ClientGuard hasBack={true}>
              <TreasureRule />
            </ClientGuard>
          }
        />
        <Route
          path="/giai-ma-kho-bau-choose"
          element={
            <ClientGuard hasBack={true}>
              <ChooseBoDe />
            </ClientGuard>
          }
        />
        <Route
          path="/giai-ma-kho-bau"
          element={
            <ClientGuard hasBack={true}>
              <Treasure />
            </ClientGuard>
          }
        />
        <Route
          path="/giai-ma-kho-bau-summary"
          element={
            <ClientGuard>
              <SummaryTuLuan />
            </ClientGuard>
          }
        />
        <Route
          path="/obstacle"
          element={
            <ClientGuard hasBack={true}>
              <Obstacle />
            </ClientGuard>
          }
        />
        <Route
          path="/obstacle-rule"
          element={
            <ClientGuard hasBack={true}>
              <Rule />
            </ClientGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <QuanLiBoDe />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/create-question"
          element={
            <AdminGuard>
              <CreateQuestion />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/edit-trac-nghiem/:id"
          element={
            <AdminGuard>
              <EditQuestion />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/gmkb"
          element={
            <AdminGuard>
              <QuanLiTuLuan />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/create-question-gmkb"
          element={
            <AdminGuard>
              <CreateTuLuan />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/edit-tu-luan/:id"
          element={
            <AdminGuard>
              <EditQuestionEssay />
            </AdminGuard>
          }
        />

        <Route
          path="/admin/create-crossWord"
          element={
            <AdminGuard>
              <CrossWordForm />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/create-collage"
          element={
            <AdminGuard>
              <CollageForm />
            </AdminGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
