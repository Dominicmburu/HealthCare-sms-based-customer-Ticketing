import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.css';
import '../../styles/AdminDashboard.css';
import { useAuth } from '../../context/AuthContext';

interface Ticket {
    id: number;
    subject: string;
    description: string;
    status: string;
    assignedToId: number;
    patientEmail: string;
    patientPhoneNumber: string;
    emailSent: boolean;
    smsSent: boolean;
}

const AdminDashboard: React.FC = () => {
    const { token } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [newStatus, setNewStatus] = useState('');
    const [statusUpdateId, setStatusUpdateId] = useState<number | null>(null);
    const [successDialog, setSuccessDialog] = useState<string | null>(null);

    // Fetch all tickets
    const fetchTickets = async () => {
        if (!token) {
            console.error('No token provided');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:3000/api/tickets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTickets();
        }
    }, [token]);

    // Handle ticket status update
    const handleStatusChange = async () => {
        if (statusUpdateId === null || newStatus === '') return;

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/tickets/${statusUpdateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus, assignedToId: 7 }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTicket = await response.json();

            const originalTicket = tickets.find((ticket) => ticket.id === statusUpdateId);
            if (originalTicket && originalTicket.status !== updatedTicket.status) {
                console.log('SuccessDialog value:', updatedTicket.status);
                setSuccessDialog(updatedTicket.status);
            }

            setNewStatus('');
            setStatusUpdateId(null);
            fetchTickets();
        } catch (error) {
            console.error('Error updating ticket status:', error);
        }
    };

    const filteredTickets = tickets.filter((ticket) => {
        return (
            (filter === 'all' || ticket.status === filter) &&
            ticket.subject.toLowerCase().includes(search.toLowerCase())
        );
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="main-content">
                <div className="ticket-summary">
                    <div className="ticket-card">{tickets.length}<br />Total Tickets</div>
                    <div className="ticket-card">{tickets.filter((t) => t.status === 'open').length}<br />Open Tickets</div>
                    <div className="ticket-card">{tickets.filter((t) => t.status === 'in_progress').length}<br />In Progress Tickets</div>
                    <div className="ticket-card">{tickets.filter((t) => t.status === 'closed').length}<br />Closed Tickets</div>
                </div>

                <div className="ticket-search">
                    <input
                        type="text"
                        placeholder="Search by subject"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="filter-button"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Tickets</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div className="ticket-list">
                    {filteredTickets.map((ticket) => (
                        <div key={ticket.id} className="ticket-item">
                            <span className={`status ${ticket.status.replace(' ', '-').toLowerCase()}`}>
                                {ticket.status}
                            </span>
                            <p>{ticket.subject}</p>
                            <div className="ticket-actions">
                                <button onClick={() => setSelectedTicket(ticket)}>View</button>
                                <button onClick={() => setStatusUpdateId(ticket.id)}>Change Status</button>
                            </div>
                        </div>
                    ))}

                    {filteredTickets.length === 0 && <div className="no-tickets">No tickets found matching your criteria.</div>}
                </div>

                {/* Status Update Modal */}
                {statusUpdateId && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Change Ticket Status</h3>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="">Select a status</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                            <button onClick={handleStatusChange}>Update</button>
                            <button onClick={() => setStatusUpdateId(null)}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Success Dialog */}
                {successDialog && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Success</h3>
                            <p>The ticket status has been successfully updated to: <strong>{successDialog}</strong></p>
                            <button
                                onClick={() => {
                                    setSuccessDialog(null);
                                    fetchTickets();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Ticket Details Modal */}
                {selectedTicket && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Ticket Details</h3>
                            <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                            <p><strong>Description:</strong> {selectedTicket.description}</p>
                            <p><strong>Status:</strong> {selectedTicket.status}</p>
                            <p><strong>Patient Email:</strong> {selectedTicket.patientEmail}</p>
                            <p><strong>Patient Phone:</strong> {selectedTicket.patientPhoneNumber}</p>
                            <p><strong>Email Sent:</strong> {selectedTicket.emailSent ? 'Yes' : 'No'}</p>
                            <p><strong>SMS Sent:</strong> {selectedTicket.smsSent ? 'Yes' : 'No'}</p>
                            <button onClick={() => setSelectedTicket(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
