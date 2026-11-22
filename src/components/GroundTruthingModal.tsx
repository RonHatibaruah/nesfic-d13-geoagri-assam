import React, { useState } from 'react';
import { GroundTruthTask, LandParcel } from '../types';
import { ClipboardCheck, Plus, CheckCircle, Clock, AlertTriangle, User, Calendar, MapPin, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroundTruthingModalProps {
  tasks: GroundTruthTask[];
  setTasks: React.Dispatch<React.SetStateAction<GroundTruthTask[]>>;
  parcels: LandParcel[];
  selectedParcelForTask: LandParcel | null;
  onCloseTaskModal: () => void;
}

export const GroundTruthingModal: React.FC<GroundTruthingModalProps> = ({
  tasks,
  setTasks,
  parcels,
  selectedParcelForTask,
  onCloseTaskModal
}) => {
  const [showCreateForm, setShowCreateForm] = useState(!!selectedParcelForTask);
  const [selectedParcelId, setSelectedParcelId] = useState(
    selectedParcelForTask?.id || parcels[0]?.id || ''
  );
  const [assignedOfficer, setAssignedOfficer] = useState('Bipul Sarma');
  const [officerDesignation, setOfficerDesignation] = useState('Agricultural Development Officer (ADO)');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Normal'>('High');
  const [targetDate, setTargetDate] = useState('2026-11-28');
  const [notes, setNotes] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const targetParcel = parcels.find((p) => p.id === selectedParcelId);
    if (!targetParcel) return;

    const newTask: GroundTruthTask = {
      id: `TSK-2026-${Math.floor(100 + Math.random() * 900)}`,
      parcelId: targetParcel.id,
      district: targetParcel.district,
      assignedOfficer,
      officerDesignation,
      status: 'Pending',
      priority,
      targetDate,
      notes: notes || `Verify soil fertility and water accessibility for ${targetParcel.name}.`
    };

    setTasks([newTask, ...tasks]);
    setShowCreateForm(false);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
    if (selectedParcelForTask) {
      onCloseTaskModal();
    }
  };

  const handleToggleStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'Pending' ? 'In Progress' : t.status === 'In Progress' ? 'Verified' : 'Pending';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className="flex-1 bg-slate-950 overflow-y-auto p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-400" />
            Field Ground-Truthing & ADO Task Dispatch
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Assign geo-tagged field verification tasks to local Agricultural Development Officers (ADOs) and KVK teams.
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-950"
        >
          <Plus className="w-4 h-4" />
          {showCreateForm ? 'Cancel Task Creation' : 'Dispatch New Verification Task'}
        </button>
      </div>

      {/* Task Creation Form */}
      {showCreateForm && (
        <form
          onSubmit={handleCreateTask}
          className="bg-slate-900 border border-slate-700/80 p-5 rounded-2xl shadow-xl space-y-4 text-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Dispatch Ground Verification Assignment
            </h3>
            {selectedParcelForTask && (
              <button
                type="button"
                onClick={onCloseTaskModal}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Land Parcel</label>
              <select
                value={selectedParcelId}
                onChange={(e) => setSelectedParcelId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {parcels.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} - {p.name} ({p.district})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Assigned Officer (ADO / Field Officer)</label>
              <input
                type="text"
                value={assignedOfficer}
                onChange={(e) => setAssignedOfficer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Officer Name"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Officer Designation & Block</label>
              <input
                type="text"
                value={officerDesignation}
                onChange={(e) => setOfficerDesignation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. ADO Hajo Block"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="Normal">🟢 Normal</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Ground-Truthing Instructions & Soil Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Take geo-tagged soil sample, test water salinity/pH, verify road access for farm machinery."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
            >
              Confirm & Dispatch Task
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Active Ground Verification Logs ({tasks.length})</span>
          <span>Click status button to cycle status</span>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-slate-700 transition"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-400 font-bold">{task.id}</span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-white">{task.parcelId}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                  {task.district}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    task.priority === 'High'
                      ? 'bg-rose-950/70 text-rose-300 border border-rose-800/50'
                      : 'bg-amber-950/70 text-amber-300 border border-amber-800/50'
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">{task.notes}</p>

              <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-cyan-400" />
                  {task.assignedOfficer} ({task.officerDesignation})
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  Target: {task.targetDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleStatus(task.id)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 border transition ${
                  task.status === 'Verified'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                    : task.status === 'In Progress'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {task.status === 'Verified' ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Verified on Ground
                  </>
                ) : task.status === 'In Progress' ? (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    In Progress
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                    Pending Verification
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
