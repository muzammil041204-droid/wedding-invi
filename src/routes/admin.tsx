import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { rsvpService, type RsvpRecord } from "@/lib/rsvp";
import { weddingData } from "@/config/wedding";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const DEFAULT_PIN = "2027";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [records, setRecords] = useState<RsvpRecord[]>(() => rsvpService.getAll());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setAuthenticated(true);
      setPinError(false);
      setRecords(rsvpService.getAll());
    } else {
      setPinError(true);
    }
  };

  const refreshRecords = () => {
    setRecords(rsvpService.getAll());
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this RSVP record?")) {
      rsvpService.deleteRecord(id);
      refreshRecords();
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear ALL RSVP records? This cannot be undone.")) {
      rsvpService.clearAll();
      refreshRecords();
    }
  };

  const handleAddSample = async () => {
    await rsvpService.send({
      firstName: "Marco",
      lastName: "Rossi",
      attending: "yes",
      adults: 2,
      children: 1,
      dietary: "Vegetarian",
      notes: "Looking forward to Lake Como!",
    });
    refreshRecords();
  };

  const handleExportCSV = () => {
    if (records.length === 0) {
      alert("No RSVP data to export.");
      return;
    }

    const headers = ["First Name", "Last Name", "Attending", "Adults", "Children", "Dietary", "Notes", "Submitted At"];
    const rows = records.map((r) => [
      `"${r.firstName.replace(/"/g, '""')}"`,
      `"${r.lastName.replace(/"/g, '""')}"`,
      r.attending.toUpperCase(),
      r.adults,
      r.children,
      `"${(r.dietary || "").replace(/"/g, '""')}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `wedding_rsvps_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(search.toLowerCase());
      const matchesFilter = filter === "all" || r.attending === filter;
      return matchesSearch && matchesFilter;
    });
  }, [records, search, filter]);

  const stats = useMemo(() => {
    const total = records.length;
    const attending = records.filter((r) => r.attending === "yes");
    const declined = records.filter((r) => r.attending === "no");
    const totalAdults = attending.reduce((acc, r) => acc + (r.adults || 0), 0);
    const totalChildren = attending.reduce((acc, r) => acc + (r.children || 0), 0);
    const totalGuests = totalAdults + totalChildren;

    return { total, yesCount: attending.length, noCount: declined.length, totalGuests, totalAdults, totalChildren };
  }, [records]);

  /* ─── Passcode Screen ─── */
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-ivory text-ink flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-cream/60 border border-hairline p-8 sm:p-10 rounded-2xl shadow-xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-medium text-warmgray mb-2">Admin Portal</p>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink font-light italic mb-6">
            {weddingData.couple.personOne} &amp; {weddingData.couple.personTwo}
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="adminPin" className="block text-xs uppercase tracking-widest text-warmgray mb-2 font-medium">
                Enter Passcode
              </label>
              <input
                id="adminPin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 2027)"
                className="w-full text-center text-lg py-3 px-4 rounded-lg bg-ivory border border-hairline focus:border-champagne focus:outline-none transition-colors"
                autoFocus
              />
              {pinError && <p className="text-xs text-red-600 mt-2 font-medium">Incorrect passcode. Please try again.</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-ink text-ivory rounded-lg text-sm uppercase tracking-widest font-medium hover:bg-champagne hover:text-ink transition-colors cursor-pointer"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-hairline">
            <Link to="/" className="text-xs uppercase tracking-wider text-warmgray hover:text-champagne transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Admin Dashboard ─── */
  return (
    <div className="min-h-screen bg-ivory text-ink p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-hairline pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne block">Admin Dashboard</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink">
              RSVP Guest Submissions
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-champagne text-ink rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-ink hover:text-ivory transition-colors cursor-pointer"
            >
              📥 Export CSV
            </button>
            <button
              type="button"
              onClick={handleAddSample}
              className="px-4 py-2.5 border border-hairline bg-cream/50 text-ink rounded-lg text-xs uppercase tracking-wider font-medium hover:border-champagne transition-colors cursor-pointer"
            >
              + Add Sample
            </button>
            <Link
              to="/"
              className="px-4 py-2.5 border border-hairline text-warmgray rounded-lg text-xs uppercase tracking-wider font-medium hover:text-ink transition-colors"
            >
              Exit Dashboard
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-cream/40 border border-hairline p-5 rounded-xl text-center">
            <p className="text-xs uppercase tracking-widest text-warmgray font-medium">Total RSVPs</p>
            <p className="text-3xl sm:text-4xl font-serif text-ink font-light mt-1">{stats.total}</p>
          </div>

          <div className="bg-cream/40 border border-hairline p-5 rounded-xl text-center">
            <p className="text-xs uppercase tracking-widest text-emerald-700 font-medium">Attending</p>
            <p className="text-3xl sm:text-4xl font-serif text-emerald-800 font-light mt-1">{stats.yesCount}</p>
          </div>

          <div className="bg-cream/40 border border-hairline p-5 rounded-xl text-center">
            <p className="text-xs uppercase tracking-widest text-rose-700 font-medium">Declined</p>
            <p className="text-3xl sm:text-4xl font-serif text-rose-800 font-light mt-1">{stats.noCount}</p>
          </div>

          <div className="bg-cream/40 border border-hairline p-5 rounded-xl text-center">
            <p className="text-xs uppercase tracking-widest text-champagne font-medium">Total Confirmed Guests</p>
            <p className="text-3xl sm:text-4xl font-serif text-ink font-light mt-1">{stats.totalGuests}</p>
            <p className="text-[0.65rem] text-warmgray uppercase tracking-wider mt-0.5">
              {stats.totalAdults} Adults · {stats.totalChildren} Kids
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-cream/30 p-4 rounded-xl border border-hairline">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by guest name..."
            className="px-4 py-2 bg-ivory border border-hairline rounded-lg text-sm focus:border-champagne focus:outline-none w-full sm:w-72"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-colors ${
                filter === "all" ? "bg-ink text-ivory" : "bg-ivory border border-hairline text-warmgray hover:text-ink"
              }`}
            >
              All ({records.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("yes")}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-colors ${
                filter === "yes" ? "bg-emerald-800 text-ivory" : "bg-ivory border border-hairline text-warmgray hover:text-ink"
              }`}
            >
              Attending ({stats.yesCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("no")}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-colors ${
                filter === "no" ? "bg-rose-800 text-ivory" : "bg-ivory border border-hairline text-warmgray hover:text-ink"
              }`}
            >
              Declined ({stats.noCount})
            </button>
          </div>
        </div>

        {/* RSVP Records Table */}
        <div className="bg-ivory border border-hairline rounded-xl overflow-hidden shadow-sm">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center text-warmgray">
              <p className="text-base font-serif italic text-ink mb-1">No RSVP submissions found.</p>
              <p className="text-xs uppercase tracking-wider">
                {records.length === 0 ? "As guests fill out the RSVP form on your site, their responses will appear here." : "Try adjusting your search or filter."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-cream/60 border-b border-hairline text-xs uppercase tracking-wider text-warmgray">
                    <th className="py-3.5 px-4 font-semibold">Guest Name</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Adults</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Kids</th>
                    <th className="py-3.5 px-4 font-semibold">Dietary</th>
                    <th className="py-3.5 px-4 font-semibold">Notes</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-cream/20 transition-colors">
                      <td className="py-4 px-4 font-medium text-ink">
                        {r.firstName} {r.lastName}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[0.7rem] uppercase tracking-wider font-semibold ${
                            r.attending === "yes"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-rose-100 text-rose-800 border border-rose-300"
                          }`}
                        >
                          {r.attending === "yes" ? "Attending" : "Declined"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-medium">{r.attending === "yes" ? r.adults : "—"}</td>
                      <td className="py-4 px-4 text-center font-medium">{r.attending === "yes" ? r.children : "—"}</td>
                      <td className="py-4 px-4 text-warmgray max-w-xs truncate">{r.dietary || "None"}</td>
                      <td className="py-4 px-4 text-warmgray max-w-xs truncate">{r.notes || "—"}</td>
                      <td className="py-4 px-4 text-xs text-warmgray whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id)}
                          className="text-xs text-red-600 hover:text-red-800 uppercase tracking-wider font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {records.length > 0 && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:underline uppercase tracking-wider cursor-pointer"
            >
              Clear All RSVP Entries
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
