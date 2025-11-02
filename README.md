# 📧 Taskflow

A powerful Flask application that automatically converts Gmail emails into tasks using Todoist. Simply forward emails to a specific Gmail label, and they'll be transformed into organized tasks with all the relevant information.

## ✨ Features

- **🔐 Secure Gmail Integration**: OAuth2 authentication with Google
- **⚡ Automatic Task Creation**: Convert emails to Todoist tasks instantly
- **🤖 AI-Powered Classification**: Machine learning to decide which emails should become tasks
- **✨ Smart Task Generation**: AI-generated task titles and descriptions from email content
- **🎯 Smart Email Processing**: Extract subject, sender, and body content (handles HTML emails)
- **📊 Flexible Search**: Process emails by label, time window, or custom queries
- **🎨 Modern UI**: Clean, responsive interface inspired by Notion
- **⚙️ Configurable Settings**: Customize task provider, labels, and processing limits
- **📱 Mobile Friendly**: Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip3
- Google account with Gmail access
- Todoist account with API access
- OpenAI API key (for AI-powered classification and task generation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emailToTaskDev
   ```

2. **Make the setup script executable and run it**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   The setup script will:
   - Install all Python dependencies
   - Guide you through Google OAuth setup
   - Configure your Todoist API token
   - Create environment variables

3. **Start the application**
   ```bash
   python3 app.py
   ```

4. **Open your browser**
   Navigate to `http://127.0.0.1:5000`

## 🔧 Manual Setup

If you prefer manual setup or the script doesn't work:

### 1. Install Dependencies

```bash
pip3 install -r requirements.txt
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add `http://127.0.0.1:5000/oauth2callback` to authorized redirect URIs
7. Download the JSON file and save it as `client_secret.json`

### 3. Todoist API Setup

1. Go to [Todoist Integrations](https://todoist.com/prefs/integrations)
2. Copy your API token

### 4. OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (you won't be able to see it again)

### 5. Environment Configuration

Create a `.env` file:

```env
# Flask Configuration
FLASK_SECRET=your-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_SECRETS=client_secret.json
GOOGLE_REDIRECT_URI=http://127.0.0.1:5000/oauth2callback

# Gmail Configuration
GMAIL_FORWARD_LABEL=todoist-forward
PROCESSED_STORE=processed.json

# Task Provider Configuration
DEFAULT_TASK_PROVIDER=todoist
TODOIST_API_TOKEN=your-todoist-api-token

# OpenAI Configuration for ML Classification
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini

# Application Configuration
FETCH_LIMIT=10
PORT=5000
```

## 📖 How to Use

### 1. Connect Gmail

1. Open the application in your browser
2. Click "Connect with Google"
3. Authorize the application to access your Gmail

### 2. Set Up Email Forwarding

1. In Gmail, create a filter or label called `todoist-forward`
2. Forward emails you want to convert to tasks to this label
3. Alternatively, use the application's search functionality

### 3. Process Emails

1. Go to the "Fetch Emails" page
2. Configure your search parameters:
   - **Task Provider**: Choose Todoist (currently the only option)
   - **Gmail Label**: Specify which label to process
   - **Max Emails**: Set how many emails to process at once
   - **Time Window**: Filter emails by date range
3. Click "Fetch Emails" to process

### 4. View Results

The application will:
- Show you the Gmail query used
- Display how many tasks were created
- List all created tasks with their details

## ⚙️ Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FLASK_SECRET` | Flask session secret key | `dev-change-me` |
| `GOOGLE_CLIENT_SECRETS` | Path to Google OAuth credentials | `client_secret.json` |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `http://127.0.0.1:5000/oauth2callback` |
| `GMAIL_FORWARD_LABEL` | Gmail label to process | `todoist-forward` |
| `PROCESSED_STORE` | File to track processed emails | `processed.json` |
| `DEFAULT_TASK_PROVIDER` | Default task provider | `todoist` |
| `TODOIST_API_TOKEN` | Todoist API token | Required |
| `FETCH_LIMIT` | Maximum emails to process | `10` |
| `PORT` | Application port | `5000` |
| `OPENAI_API_KEY` | OpenAI API key for ML features | Required |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4o-mini` |

## 🤖 AI Classification Features

The application uses OpenAI's GPT models to intelligently process emails:

### Email Classification
The AI automatically determines whether an email should become a task based on:
- **Action items or requests** → Creates task
- **Reminders or deadlines** → Creates task
- **Meeting invitations** → Creates task
- **Bills or payments** → Creates task
- **Pure newsletters** → Skips
- **Marketing content** → Skips
- **Social media notifications** → Skips
- **FYI-only messages** → Skips

### Task Generation
For emails classified as tasks, the AI:
- **Generates concise titles**: Actionable, 3-8 words, removing prefixes like "RE:", "FWD:"
- **Creates clean descriptions**: Extracts key details, dates, and requirements
- **Handles HTML content**: Automatically converts HTML emails to clean plain text
- **Provides reasoning**: Logs why decisions were made (visible in console)

### Fallback Behavior
If OpenAI API is unavailable or not configured:
- All emails are processed as tasks (default behavior)
- Original email subject becomes task title
- Original email body becomes task description

