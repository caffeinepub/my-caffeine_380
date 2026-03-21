import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Package } from "../backend";
import type { AdminAccount } from "../backend.d";
import { samplePackages } from "../data/sampleData";
import { useActor } from "../hooks/useActor";
import { useCompanySettings } from "../hooks/useCompanySettings";
import { usePackages } from "../hooks/useQueries";

interface PackageFormData {
  name: string;
  speed: string;
  monthlyPrice: string;
  description: string;
}

const emptyForm: PackageFormData = {
  name: "",
  speed: "",
  monthlyPrice: "",
  description: "",
};

interface SettingsProps {
  isSuperAdmin: boolean;
  isAdmin?: boolean;
}

export default function Settings({
  isSuperAdmin,
  isAdmin: _isAdmin = false,
}: SettingsProps) {
  const { data: packages, isLoading } = usePackages();
  const { actor } = useActor();
  const allPackages =
    packages && packages.length > 0 ? packages : samplePackages;

  const { settings, save } = useCompanySettings();
  const [companyForm, setCompanyForm] = useState({
    name: settings.name,
    address: settings.address,
    email: settings.email,
    whatsapp: settings.whatsapp,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo);
  const [savingCompany, setSavingCompany] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setLogoPreview(result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSaveCompany() {
    setSavingCompany(true);
    await new Promise((r) => setTimeout(r, 300));
    save({ ...companyForm, logo: logoPreview });
    setSavingCompany(false);
    toast.success("প্রতিষ্ঠানের তথ্য সংরক্ষণ করা হয়েছে");
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [form, setForm] = useState<PackageFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditingPkg(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(p: Package) {
    setEditingPkg(p);
    setForm({
      name: p.name,
      speed: p.speed,
      monthlyPrice: p.monthlyPrice.toString(),
      description: p.description,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setModalOpen(false);
    toast.success(
      editingPkg ? "প্যাকেজ আপডেট করা হয়েছে" : "নতুন প্যাকেজ যোগ করা হয়েছে",
    );
  }

  // --- Admin Management ---
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showAdminPw, setShowAdminPw] = useState(false);
  const [addingAdmin, setAddingAdmin] = useState(false);

  useEffect(() => {
    if (!isSuperAdmin || !actor) return;
    setLoadingAdmins(true);
    actor
      .getAdminAccounts()
      .then(setAdminAccounts)
      .catch(() => toast.error("এডমিন তালিকা লোড করতে সমস্যা"))
      .finally(() => setLoadingAdmins(false));
  }, [isSuperAdmin, actor]);

  async function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }
    if (adminForm.password !== adminForm.confirm) {
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }
    if (!actor) return;
    setAddingAdmin(true);
    try {
      await actor.addAdminAccount(
        adminForm.email,
        adminForm.password,
        adminForm.name,
      );
      const updated = await actor.getAdminAccounts();
      setAdminAccounts(updated);
      setAdminForm({ name: "", email: "", password: "", confirm: "" });
      toast.success(`${adminForm.name} কে এডমিন হিসেবে যোগ করা হয়েছে`);
    } catch {
      toast.error("এডমিন যোগ করতে সমস্যা হয়েছে");
    } finally {
      setAddingAdmin(false);
    }
  }

  async function handleRemoveAdmin(email: string) {
    if (!actor) return;
    try {
      await actor.removeAdminAccount(email);
      setAdminAccounts((prev) => prev.filter((a) => a.email !== email));
      toast.success("এডমিন সরিয়ে দেওয়া হয়েছে");
    } catch {
      toast.error("এডমিন সরাতে সমস্যা হয়েছে");
    }
  }

  return (
    <div className="space-y-6" data-ocid="settings.page">
      {/* Company Info & Logo */}
      <Card
        className="shadow-card border-border"
        data-ocid="settings.company.card"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                প্রতিষ্ঠানের তথ্য ও লোগো
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                প্রতিষ্ঠানের বিস্তারিত তথ্য ও লোগো আপলোড করুন
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Logo upload */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden"
                data-ocid="settings.logo.dropzone"
              >
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="লোগো"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Wifi className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => fileRef.current?.click()}
                data-ocid="settings.logo.upload_button"
              >
                <ImagePlus size={13} className="mr-1.5" />
                লোগো আপলোড
              </Button>
              {logoPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:text-destructive"
                  onClick={() => setLogoPreview(null)}
                  data-ocid="settings.logo.delete_button"
                >
                  <X size={13} className="mr-1.5" />
                  সরিয়ে দিন
                </Button>
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">প্রতিষ্ঠানের নাম *</Label>
                <Input
                  data-ocid="settings.company_name.input"
                  value={companyForm.name}
                  onChange={(e) =>
                    setCompanyForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="নওশীন ব্রডব্যান্ড ইন্টারনেট"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">ঠিকানা</Label>
                <Input
                  data-ocid="settings.company_address.input"
                  value={companyForm.address}
                  onChange={(e) =>
                    setCompanyForm((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="গ্রাম/শহর, জেলা"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">ইমেইল আইডি</Label>
                <Input
                  data-ocid="settings.company_email.input"
                  type="email"
                  value={companyForm.email}
                  onChange={(e) =>
                    setCompanyForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="info@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">WhatsApp নম্বর</Label>
                <Input
                  data-ocid="settings.company_whatsapp.input"
                  value={companyForm.whatsapp}
                  onChange={(e) =>
                    setCompanyForm((p) => ({ ...p, whatsapp: e.target.value }))
                  }
                  placeholder="০১৭XX-XXXXXX"
                />
              </div>
              <div className="sm:col-span-2">
                <Button
                  className="bg-primary text-white"
                  onClick={handleSaveCompany}
                  disabled={savingCompany}
                  data-ocid="settings.save_company.button"
                >
                  {savingCompany && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  সংরক্ষণ করুন
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Package Management */}
      <Card
        className="shadow-card border-border"
        data-ocid="settings.packages.card"
      >
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              ইন্টারনেট প্যাকেজ
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              সকল ইন্টারনেট প্যাকেজ পরিচালনা করুন
            </p>
          </div>
          <Button
            className="bg-primary text-white"
            size="sm"
            onClick={openAdd}
            data-ocid="settings.add_package.button"
          >
            <Plus size={15} className="mr-1.5" />
            নতুন প্যাকেজ
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div
              className="p-4 space-y-3"
              data-ocid="settings.packages.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 w-full bg-muted animate-pulse rounded"
                />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {allPackages.map((pkg, i) => (
                <div
                  key={pkg.id.toString()}
                  className="flex items-center justify-between px-5 py-4 hover:bg-muted/20"
                  data-ocid={`settings.package.item.${i + 1}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Wifi className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {pkg.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">গতি</p>
                      <p className="font-semibold text-sm text-primary">
                        {pkg.speed}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">মাসিক মূল্য</p>
                      <p className="font-bold text-sm">
                        ৳{pkg.monthlyPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => openEdit(pkg)}
                        data-ocid={`settings.edit_package.${i + 1}`}
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() =>
                          toast.success(`${pkg.name} মুছে ফেলা হয়েছে`)
                        }
                        data-ocid={`settings.delete_package.${i + 1}`}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {allPackages.length === 0 && (
                <p
                  className="text-center text-muted-foreground py-10"
                  data-ocid="settings.packages.empty_state"
                >
                  কোনো প্যাকেজ পাওয়া যায়নি
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Management - Super Admin only */}
      {isSuperAdmin && (
        <Card
          className="shadow-card border-border"
          data-ocid="settings.admin.card"
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">
                  এডমিন ম্যানেজমেন্ট
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  নতুন এডমিন যুক্ত করুন ও পরিচালনা করুন
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Admin Form */}
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                নতুন এডমিন যুক্ত করুন
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">নাম *</Label>
                  <Input
                    placeholder="এডমিনের নাম"
                    value={adminForm.name}
                    onChange={(e) =>
                      setAdminForm((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid="settings.admin_name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">ইমেইল আইডি *</Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={adminForm.email}
                    onChange={(e) =>
                      setAdminForm((p) => ({ ...p, email: e.target.value }))
                    }
                    data-ocid="settings.admin_email.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">পাসওয়ার্ড *</Label>
                  <div className="relative">
                    <Input
                      type={showAdminPw ? "text" : "password"}
                      placeholder="পাসওয়ার্ড দিন"
                      value={adminForm.password}
                      onChange={(e) =>
                        setAdminForm((p) => ({
                          ...p,
                          password: e.target.value,
                        }))
                      }
                      className="pr-10"
                      data-ocid="settings.admin_password.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowAdminPw((p) => !p)}
                    >
                      {showAdminPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">পাসওয়ার্ড নিশ্চিত করুন *</Label>
                  <Input
                    type="password"
                    placeholder="পাসওয়ার্ড আবার দিন"
                    value={adminForm.confirm}
                    onChange={(e) =>
                      setAdminForm((p) => ({ ...p, confirm: e.target.value }))
                    }
                    data-ocid="settings.admin_confirm_password.input"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-primary text-white"
                disabled={addingAdmin}
                data-ocid="settings.add_admin.button"
              >
                {addingAdmin && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Plus size={15} className="mr-1.5" />
                নতুন এডমিন যুক্ত করুন
              </Button>
            </form>

            {/* Admin List */}
            <div>
              <h3 className="text-sm font-semibold mb-3">বর্তমান এডমিন তালিকা</h3>
              {loadingAdmins ? (
                <div
                  className="space-y-2"
                  data-ocid="settings.admin.loading_state"
                >
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-12 bg-muted animate-pulse rounded"
                    />
                  ))}
                </div>
              ) : adminAccounts.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground py-4 text-center"
                  data-ocid="settings.admin.empty_state"
                >
                  কোনো এডমিন নেই
                </p>
              ) : (
                <div className="divide-y divide-border border rounded-lg overflow-hidden">
                  {adminAccounts.map((admin, i) => (
                    <div
                      key={admin.email}
                      className="flex items-center justify-between px-4 py-3 hover:bg-muted/20"
                      data-ocid={`settings.admin.item.${i + 1}`}
                    >
                      <div>
                        <p className="text-sm font-medium">{admin.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {admin.email}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveAdmin(admin.email)}
                        data-ocid={`settings.admin.delete_button.${i + 1}`}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Package Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent data-ocid="settings.dialog">
          <DialogHeader>
            <DialogTitle>
              {editingPkg ? "প্যাকেজ সম্পাদনা" : "নতুন প্যাকেজ"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">প্যাকেজের নাম *</Label>
              <Input
                data-ocid="settings.package_name.input"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="বেসিক প্যাকেজ"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">ইন্টারনেট গতি</Label>
                <Input
                  data-ocid="settings.package_speed.input"
                  value={form.speed}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, speed: e.target.value }))
                  }
                  placeholder="10 Mbps"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">মাসিক মূল্য (৳)</Label>
                <Input
                  data-ocid="settings.package_price.input"
                  type="number"
                  value={form.monthlyPrice}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, monthlyPrice: e.target.value }))
                  }
                  placeholder="600"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">বিবরণ</Label>
              <Textarea
                data-ocid="settings.package_description.textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="প্যাকেজের বিবরণ"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="settings.cancel_button"
            >
              বাতিল
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleSave}
              disabled={saving}
              data-ocid="settings.submit_button"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingPkg ? "আপডেট করুন" : "যোগ করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
