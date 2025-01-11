import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { useAuth } from '../context/AuthContext';

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

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);


  useEffect(() => {
    // Fetch all tickets from the API
    const fetchTickets = async () => {
      if (!token) {
        console.error('No token provided');
        return;
      }
      try {
        const response = await fetch('http://127.0.0.1:3000/api/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTickets();
    }
  }, [token]);

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filter === 'all' || ticket.status === filter) &&
      ticket.subject.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async () => {
    if (ticketToDelete === null) return;

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/tickets/${ticketToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketToDelete));
      setShowConfirmDialog(false);
      setTicketToDelete(null);
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const openDetailsModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setSelectedTicket(null);
    setShowDetailsModal(false);
  };

  const openConfirmDialog = (id: number) => {
    setTicketToDelete(id);
    setShowConfirmDialog(true);
  };

  const closeConfirmDialog = () => {
    setTicketToDelete(null);
    setShowConfirmDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="ticket-summary">
          <div className="ticket-card">{tickets.length}<br />Total Tickets</div>
          <div className="ticket-card">{tickets.filter((t) => t.status === 'open').length}<br />Opened Tickets</div>
          <div className="ticket-card">{tickets.filter((t) => t.status === 'in progress').length}<br />In-progress Tickets</div>
          <div className="ticket-card">{tickets.filter((t) => t.status === 'closed').length}<br />Closed Tickets</div>
        </div>

        <div className="ticket-search">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-button" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Ticket List */}
        <div className="ticket-list">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <span className={`status ${ticket.status.replace(' ', '-').toLowerCase()}`}>
                {ticket.status}
              </span>
              <p>{ticket.subject}</p>
              <div className="ticket-actions">
                <button onClick={() => openDetailsModal(ticket)}>View</button>
                <button onClick={() => openConfirmDialog(ticket.id)}>Delete</button>
              </div>
            </div>
          ))}

          {/* No Tickets Message */}
          {filteredTickets.length === 0 && (
            <div className="no-tickets">No tickets found matching your criteria.</div>
          )}

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <div className="dialog">
              <div className="dialog-content">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this ticket?</p>
                <button onClick={handleDelete}>Yes, Delete</button>
                <button onClick={closeConfirmDialog}>Cancel</button>
              </div>
            </div>
          )}

          {/* Details Modal */}
          {showDetailsModal && selectedTicket && (
            <div className="modal">
              <div className="modal-content">
                <h3>Ticket Details</h3>
                <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                <p><strong>Description:</strong> {selectedTicket.description}</p>
                <p><strong>Status:</strong> {selectedTicket.status}</p>
                <p><strong>Patient Email:</strong> {selectedTicket.patientEmail}</p>
                <p><strong>Patient Phone:</strong> {selectedTicket.patientPhoneNumber}</p>
                <p><strong>Email Sent:</strong> {selectedTicket.emailSent ? 'Yes' : 'No'}</p>
                <p><strong>Sms Sent:</strong> {selectedTicket.smsSent ? 'Yes' : 'No'}</p>
                <button onClick={closeDetailsModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
