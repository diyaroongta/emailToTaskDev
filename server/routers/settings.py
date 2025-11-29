from flask import Blueprint, session, jsonify, request
from datetime import datetime, timezone
from server.utils import get_current_user, require_auth
from server.db import db_session, UserSettings
from sqlalchemy import select

settings_bp = Blueprint('settings', __name__)

@settings_bp.route("/settings", methods=["GET"])
@require_auth
def get_settings():
    """Get user settings."""

    user = get_current_user()
    if not user:
        return jsonify({"error": "Could not determine user"}), 401

    user_id = user.id

    try:
        with db_session() as s:
            stmt = select(UserSettings).where(UserSettings.user_id == user_id)
            user_settings = s.execute(stmt).scalar_one_or_none()
            
            if not user_settings:
                # Return default settings if none exist
                return jsonify({
                    "max": 10,
                    "window": "1d",
                    "task_categories": [],
                    "calendar_categories": [],
                    "auto_generate": True,
                })
            
            return jsonify({
                "max": user_settings.max,
                "window": user_settings.window,
                "task_categories": user_settings.task_categories if user_settings.task_categories else [],
                "calendar_categories": user_settings.calendar_categories if user_settings.calendar_categories else [],
                "auto_generate": user_settings.auto_generate if user_settings.auto_generate is not None else True,
            })
    except Exception as e:
        return jsonify({"error": "Failed to fetch settings"}), 500

@settings_bp.route("/settings", methods=["PUT", "POST"])
@require_auth
def update_settings():
    """Create or update user settings."""

    user = get_current_user()
    if not user:
        return jsonify({"error": "Could not determine user"}), 401

    user_id = user.id

    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        max_value = data.get("max")
        window = data.get("window", "")
        task_categories = data.get("task_categories")
        calendar_categories = data.get("calendar_categories")
        auto_generate = data.get("auto_generate", True)

        with db_session() as s:
            stmt = select(UserSettings).where(UserSettings.user_id == user_id)
            user_settings = s.execute(stmt).scalar_one_or_none()

            if user_settings:
                # Update existing settings
                user_settings.provider = "google_tasks"
                user_settings.max = max_value
                user_settings.window = window
                user_settings.task_categories = task_categories if task_categories is not None else []
                user_settings.calendar_categories = calendar_categories if calendar_categories is not None else []
                user_settings.auto_generate = auto_generate if auto_generate is not None else True
                user_settings.updated_at = datetime.now(timezone.utc)
            else:
                # Create new settings
                user_settings = UserSettings(
                    user_id=user_id,
                    provider="google_tasks",
                    max=max_value,
                    window=window,
                    task_categories=task_categories if task_categories is not None else [],
                    calendar_categories=calendar_categories if calendar_categories is not None else [],
                    auto_generate=auto_generate if auto_generate is not None else True,
                )
                s.add(user_settings)
            
            s.flush()
            
            # Extract values before session closes
            result = {
                "max": user_settings.max,
                "window": user_settings.window,
                "task_categories": user_settings.task_categories if user_settings.task_categories else [],
                "calendar_categories": user_settings.calendar_categories if user_settings.calendar_categories else [],
                "auto_generate": user_settings.auto_generate if user_settings.auto_generate is not None else True,
            }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": "Failed to update settings"}), 500

