import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorksPage from "./pages/HowItWorksPage";
import PricingPage from "./pages/PricingPage";
import CasesPage from "./pages/CasesPage";
import AboutPage from "./pages/AboutPage";
import CreateDocumentPage from "./pages/CreateDocumentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import LegalNewsPage from "./pages/LegalNewsPage";
import { DocumentProvider } from "./contexts/DocumentContext";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import DocumentListPage from "./pages/admin/DocumentListPage";
import DocumentDetailPage from "./pages/admin/DocumentDetailPage";
import BillingManagementPage from "./pages/admin/BillingManagementPage";
import SupportManagementPage from "./pages/admin/SupportManagementPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import { AdminProvider } from "./contexts/AdminContext";
import UserDashboardPage from "./pages/dashboard/UserDashboardPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import PaymentsPage from "./pages/dashboard/PaymentsPage";
import AccountPage from "./pages/dashboard/AccountPage";
import SupportPage from "./pages/dashboard/SupportPage";
import LawyerLoginPage from "./pages/LawyerLoginPage";
import LawyerDashboardPage from "./pages/lawyer/LawyerDashboardPage";
import LawyerCasesPage from "./pages/lawyer/LawyerCasesPage";
import LawyerDocumentsPage from "./pages/lawyer/LawyerDocumentsPage";
import LawyerTemplatesPage from "./pages/lawyer/LawyerTemplatesPage";
import LawyerClientsPage from "./pages/lawyer/LawyerClientsPage";
import LawyerConsultationsPage from "./pages/lawyer/LawyerConsultationsPage";
import LawyerCalendarPage from "./pages/lawyer/LawyerCalendarPage";
import LawyerPaymentsPage from "./pages/lawyer/LawyerPaymentsPage";
import LawyerLibraryPage from "./pages/lawyer/LawyerLibraryPage";
import LawyerSettingsPage from "./pages/lawyer/LawyerSettingsPage";
import LawyerProfilePage from "./pages/lawyer/LawyerProfilePage";
import LawyerNotificationsPage from "./pages/lawyer/LawyerNotificationsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import FirmLoginPage from "./pages/FirmLoginPage";
import FirmDashboardPage from "./pages/firm/FirmDashboardPage";
import FirmCasesPage from "./pages/firm/FirmCasesPage";
import FirmDocumentsPage from "./pages/firm/FirmDocumentsPage";
import FirmClientsPage from "./pages/firm/FirmClientsPage";
import FirmCalendarPage from "./pages/firm/FirmCalendarPage";
import FirmConsultationsPage from "./pages/firm/FirmConsultationsPage";
import FirmBillingPage from "./pages/firm/FirmBillingPage";
import FirmAnalyticsPage from "./pages/firm/FirmAnalyticsPage";
import FirmSettingsPage from "./pages/firm/FirmSettingsPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from '@/contexts/CartContext';
import IncidentStatusPage from "./pages/dashboard/IncidentStatusPage";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <CartProvider>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider delayDuration={300}>
            <AuthProvider>
              <DocumentProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/cases" element={<CasesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/create-document" element={<CreateDocumentPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/firm/login" element={<FirmLoginPage />} />
                    
                    {/* 로펌 플랫폼 라우트 */}
                    <Route path="/firm/dashboard" element={<FirmDashboardPage />} />
                    <Route path="/firm/cases" element={<FirmCasesPage />} />
                    <Route path="/firm/documents" element={<FirmDocumentsPage />} />
                    <Route path="/firm/clients" element={<FirmClientsPage />} />
                    <Route path="/firm/calendar" element={<FirmCalendarPage />} />
                    <Route path="/firm/consultations" element={<FirmConsultationsPage />} />
                    <Route path="/firm/billing" element={<FirmBillingPage />} />
                    <Route path="/firm/analytics" element={<FirmAnalyticsPage />} />
                    <Route path="/firm/settings" element={<FirmSettingsPage />} />
                    
                    {/* Justice Scribe Online 변호사 플랫폼 라우트 */}
                    <Route path="/lawyer/login" element={<LawyerLoginPage />} />
                    <Route path="/lawyer/dashboard" element={<LawyerDashboardPage />} />
                    <Route path="/lawyer/cases" element={<LawyerCasesPage />} />
                    <Route path="/lawyer/documents" element={<LawyerDocumentsPage />} />
                    <Route path="/lawyer/templates" element={<LawyerTemplatesPage />} />
                    <Route path="/lawyer/clients" element={<LawyerClientsPage />} />
                    <Route path="/lawyer/consultations" element={<LawyerConsultationsPage />} />
                    <Route path="/lawyer/calendar" element={<LawyerCalendarPage />} />
                    <Route path="/lawyer/payments" element={<LawyerPaymentsPage />} />
                    <Route path="/lawyer/library" element={<LawyerLibraryPage />} />
                    <Route path="/lawyer/settings" element={<LawyerSettingsPage />} />
                    <Route path="/lawyer/profile" element={<LawyerProfilePage />} />
                    <Route path="/lawyer/notifications" element={<LawyerNotificationsPage />} />
                    
                    {/* User Dashboard Routes */}
                    <Route path="/dashboard" element={<UserDashboardPage />} />
                    <Route path="/dashboard/notifications" element={<NotificationsPage />} />
                    <Route path="/dashboard/payments" element={<PaymentsPage />} />
                    <Route path="/dashboard/account" element={<AccountPage />} />
                    <Route path="/dashboard/support" element={<SupportPage />} />
                    <Route path="/dashboard/incident-status" element={<IncidentStatusPage />} />
                    
                    {/* Footer Pages */}
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/legal-notice" element={<LegalNoticePage />} />
                    <Route path="/legal-news" element={<LegalNewsPage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin/*" element={
                      <AdminProvider>
                        <Routes>
                          <Route path="/dashboard" element={<AdminDashboardPage />} />
                          <Route path="/users" element={<UserManagementPage />} />
                          <Route path="/documents" element={<DocumentListPage />} />
                          <Route path="/documents/:id" element={<DocumentDetailPage />} />
                          <Route path="/billing" element={<BillingManagementPage />} />
                          <Route path="/support" element={<SupportManagementPage />} />
                          <Route path="/analytics" element={<AnalyticsPage />} />
                          <Route path="/settings" element={<AdminSettingsPage />} />
                          <Route path="/notifications" element={<AdminNotificationsPage />} />
                        </Routes>
                      </AdminProvider>
                    } />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </DocumentProvider>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </CartProvider>
  );
};

export default App;
